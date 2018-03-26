/*
 Copyright (C) 2007 National Institute For Space Research (INPE) - Brazil.

 This file is part of TerraMA2 - a free and open source computational
 platform for analysis, monitoring, and alert of geo-environmental extremes.

 TerraMA2 is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License,
 or (at your option) any later version.

 TerraMA2 is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with TerraMA2. See LICENSE. If not, write to
 TerraMA2 Team at <terrama2-team@dpi.inpe.br>.
 */

/*!
  \file terrama2/core/data-access/DataAccessorJsonCemaden.cpp

  \brief

  \author Jano Simas
 */


 #include "DataAccessorJsonCemaden.hpp"
 #include "../core/utility/DataRetrieverFactory.hpp"
 #include "../core/utility/Utils.hpp"
 #include "../core/utility/TimeUtils.hpp"
 #include "../core/Exception.hpp"

 #include <terralib/core/uri/URI.h>
 #include <terralib/datatype/DateTimeProperty.h>
 #include <terralib/datatype/SimpleProperty.h>
 #include <terralib/memory/DataSet.h>
 #include <terralib/memory/DataSetItem.h>

#include <QJsonDocument>
#include <QJsonObject>
#include <QJsonArray>

 std::map<DataSetId, std::string> terrama2::core::DataAccessorJsonCemaden::getFiles(const Filter& filter, std::shared_ptr<FileRemover> remover) const
 {
   auto& retrieverFactory = DataRetrieverFactory::getInstance();
   DataRetrieverPtr dataRetriever = retrieverFactory.make(dataProvider_);

   // Cemaden has only one service for all DCPs
   // all information is replicated in all DCPs
   auto dataset = dataSeries_->datasetList.front();
   auto uri = retrieveData(dataRetriever, dataset, filter, remover);

   // map all dataset to the same uri
   std::map<DataSetId, std::string> uriMap;
   for(const auto& dataset : dataSeries_->datasetList)
   {
     uriMap.emplace(dataset->id, uri);
   }

   return uriMap;
 }

 void terrama2::core::DataAccessorJsonCemaden::getSeriesCallback( const Filter& filter,
                                                                  std::shared_ptr<FileRemover> remover,
                                                                  std::function<void(const DataSetId&, const std::string& /*uri*/)> processFile) const
 {
   // Cemaden has a webservice for all files
   // only one download is needed
   auto datasetMap = getFiles(filter, remover);
   for (const auto& it : datasetMap)
   {
     processFile(it.first, it.second);
   }
 }

terrama2::core::DataSetSeries terrama2::core::DataAccessorJsonCemaden::getSeries( const std::string& uri,
                                                                                  const Filter& filter,
                                                                                  DataSetPtr dataSet,
                                                                                  std::shared_ptr<terrama2::core::FileRemover> /*remover*/) const
{
  QString codestacao = "codestacao";
  QString timestampProperty = "dataHora";
  QList<QString> staticData = {"cidade", "nome", "tipo", "uf", "latitude", "longitude"};

  QString code = "352400601A";// = QString::fromStdString(getDCPCode(dataSet));

  auto dataSetType =  std::make_shared<te::da::DataSetType>(code.toStdString());
  dataSetType->add(new te::dt::DateTimeProperty(timestampProperty.toStdString(), te::dt::TIME_INSTANT_TZ, true));

  auto teDataSet = std::make_shared<te::mem::DataSet>(dataSetType.get());

  te::core::URI teUri(uri);
  auto jsonStr = readFileContents(teUri.path()+"/static-http.txt");
  QJsonDocument doc = QJsonDocument::fromJson(jsonStr.c_str());
  auto readingsArray = doc.object()["cemaden"].toArray();
  // iterate over readings
  // and populate the dataset
  for(auto reading : readingsArray)
  {
    auto obj = reading.toObject();
    //check if this is the DCP we want
    if(obj[codestacao].toString() != code)
      continue;

    auto timestampStr = obj[timestampProperty].toString().toStdString();//"2017-09-20T13:00:00-03", 2018-03-26 16:10:00.0 terrama2::core::TimeUtils::webgui_timefacet
    auto timestamp = terrama2::core::TimeUtils::stringToTimestamp(timestampStr, "%Y-%m-%d %H:%M:%S%F");
    // filter by timestamp
    if((filter.discardBefore && (*filter.discardBefore > *timestamp))
        || (filter.discardAfter && (*filter.discardAfter < *timestamp)))
        continue;

    // create new item
    auto item = std::unique_ptr<te::mem::DataSetItem>(new te::mem::DataSetItem(teDataSet.get()));
    // add item to the end of the dataset
    teDataSet->moveLast();
    teDataSet->add(item.get());

    // add timestamp to dataset
    item->setDateTime(timestampProperty.toStdString(), static_cast<te::dt::TimeInstantTZ*>(timestamp->clone()));

    for(auto val = obj.begin(); val != obj.end(); ++val) {
      auto key = val.key();
      // ignore static data
      if(staticData.contains(key)
          || key == codestacao
          || key == timestampProperty)
        continue;

      // property name
      auto keyStr = key.toStdString();

      // check if the property is already registered in the dataset
      auto properties = dataSetType->getProperties();
      auto it = std::find_if(properties.cbegin(), properties.cend(), [&keyStr](te::dt::Property* property){ return property->getName() == keyStr; });
      if(it == properties.cend())
      {
        // update dataSetType
        te::dt::SimpleProperty* property = new te::dt::SimpleProperty(keyStr, te::dt::DOUBLE_TYPE, false);
        dataSetType->add(property);
        // update memory dataset structure
        teDataSet->add(keyStr, te::dt::DOUBLE_TYPE);
      }

      // add property value
      item->setDouble(keyStr, val.value().toDouble());
    }
    item.release();
  }

  terrama2::core::DataSetSeries serie;
  serie.dataSet = dataSet;
  serie.syncDataSet = std::make_shared<terrama2::core::SynchronizedDataSet>(teDataSet);
  serie.teDataSetType = dataSetType;

  return serie;
}

std::string terrama2::core::DataAccessorJsonCemaden::retrieveData(const DataRetrieverPtr dataRetriever,
                                                                  DataSetPtr dataSet,
                                                                  const Filter& filter,
                                                                  std::shared_ptr<FileRemover> remover) const
{
  std::string mask;// = getEndpoint(dataSet);
  std::string folderPath;// = getPath(dataSet);

  std::string timezone;
  try
  {
    timezone = getTimeZone(dataSet);
  }
  catch(const UndefinedTagException& /*e*/)
  {
    timezone = "UTC+00";
  }

  return dataRetriever->retrieveData(mask, filter, timezone, remover, "", folderPath);
}

void terrama2::core::DataAccessorJsonCemaden::retrieveDataCallback( const DataRetrieverPtr /*dataRetriever*/,
                                                                    DataSetPtr /*dataSet*/,
                                                                    const Filter& /*filter*/,
                                                                    std::shared_ptr<FileRemover> /*remover*/,
                                                                    std::function<void(const std::string& /*uri*/)> /*processFile*/) const
{
  QString errMsg = QObject::tr("Invalid method call.");
  throw NotRetrivableException() << ErrorDescription(errMsg);
}

std::string terrama2::core::DataAccessorJsonCemaden::dataSourceType() const
{
  QString errMsg = QObject::tr("Invalid method call.");
  throw Exception() << ErrorDescription(errMsg);
}

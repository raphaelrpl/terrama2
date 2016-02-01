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
  \file terrama2/core/Exception.hpp

  \brief Specific exception classes from core module.

  \author Paulo R. M. Oliveira
 */

#ifndef __TERRAMA2_CORE_EXCEPTION_HPP__
#define __TERRAMA2_CORE_EXCEPTION_HPP__

// TerraMA2
#include "../Exception.hpp"

namespace terrama2
{
  namespace core
  {
    //! Base excection for core module.
    struct Exception : virtual terrama2::Exception { };

    //! Indicates that an exception comming from TerraLib Data Access module.
    struct DataAccessException: virtual Exception{ };

    //! Exception to be used when a DataSet can not be removed because it's in use by an analysis.
    struct DataSetInUseException: virtual Exception{ };

    struct UnableToConnect : virtual Exception{ };

  }  // end namespace core
}  // end namespace terrama2

#endif  // __TERRAMA2_CORE_EXCEPTION_HPP__

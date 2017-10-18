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
  \file src/terrama2/services/analysis/core/utility/PythonInterpreterInit.hpp

  \brief Raii class for initialize and finalize python interpreter

  \author Jano Simas
*/

#include "PythonInterpreterInit.hpp"
#include "../python/PythonInterpreter.hpp"
#include "../python/PythonBindingGrid.hpp"
#include "../python/PythonBindingMonitoredObject.hpp"
#include "../python/PythonBindingDCP.hpp"

terrama2::services::analysis::core::PythonInterpreterInit::PythonInterpreterInit()
{
  python::GILLock lock;
  python::populateNamespace();
  terrama2::services::analysis::core::python::Grid::registerFunctions();
  terrama2::services::analysis::core::python::MonitoredObject::registerFunctions();
  terrama2::services::analysis::core::python::DCP::registerFunctions();
}

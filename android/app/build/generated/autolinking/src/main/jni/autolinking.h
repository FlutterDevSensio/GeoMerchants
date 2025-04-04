/**
 * This code was generated by [React Native](https://www.npmjs.com/package/@react-native/gradle-plugin).
 *
 * Do not edit this file as changes may cause incorrect behavior and will be lost
 * once the code is regenerated.
 *
 */

#pragma once

#include <ReactCommon/CallInvoker.h>
#include <ReactCommon/JavaTurboModule.h>
#include <ReactCommon/TurboModule.h>
#include <jsi/jsi.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>

namespace facebook {
namespace react {

std::shared_ptr<TurboModule> autolinking_ModuleProvider(const std::string moduleName, const JavaTurboModule::InitParams &params);
std::shared_ptr<TurboModule> autolinking_cxxModuleProvider(const std::string moduleName, const std::shared_ptr<CallInvoker>& jsInvoker);
void autolinking_registerProviders(std::shared_ptr<ComponentDescriptorProviderRegistry const> providerRegistry);

} // namespace react
} // namespace facebook
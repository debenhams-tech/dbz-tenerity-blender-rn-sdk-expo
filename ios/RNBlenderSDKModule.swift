//
//  RNBlenderSDKModule.swift
//  RNBlenderSDKModule
//
//  Copyright © 2022 Moddather Rashed. All rights reserved.
//

import Foundation

@objc(RNBlenderSDKModule)
class RNBlenderSDKModule: NSObject {
  @objc
  func constantsToExport() -> [AnyHashable : Any]! {
    return ["count": 1]
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}

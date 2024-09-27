// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "DirectoryAnalyzer",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "DirectoryAnalyzer",
            targets: ["DirectoryAnalyzerPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", branch: "main")
    ],
    targets: [
        .target(
            name: "DirectoryAnalyzerPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/DirectoryAnalyzerPlugin"),
        .testTarget(
            name: "DirectoryAnalyzerPluginTests",
            dependencies: ["DirectoryAnalyzerPlugin"],
            path: "ios/Tests/DirectoryAnalyzerPluginTests")
    ]
)
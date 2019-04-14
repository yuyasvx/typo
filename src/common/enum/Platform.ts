enum Platform {
  WINDOWS,
  MACOS,
  LINUX,
  UNKNOWN
}

namespace Platform {
  export function value(platform: Platform): string {
    switch (platform) {
      case Platform.MACOS:
        return 'macos';
      case Platform.WINDOWS:
        return 'windows';
      case Platform.LINUX:
        return 'linux';
      case Platform.UNKNOWN:
        return 'unknown';
      default:
        return 'unknown';
    }
  }
}

export default Platform;

declare interface StyleInterface {
  [key: string]: string | null | undefined;
  width?: string;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
}

declare interface FontManagerItem {
  /** フォントがインストールされている場所 */
  path?: string;

  /** PostScript名 */
  postscriptName?: string;

  /** フォントファミリ名 */
  family?: string;

  /** フォントの太さ。例："Bold"、"Light" */
  style?: string;

  /** フォントの太さ（数字）。例：300 */
  weight?: number;

  /** 幅？ */
  width?: number;

  /** イタリックかどうか */
  italic?: boolean;

  /** monospaceかどうか */
  monospace?: boolean;
}

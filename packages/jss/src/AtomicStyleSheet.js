// @flow
import RuleList from './RuleList'
import type {
  InternalStyleSheetOptions,
  Rule,
  ToCssOptions,
  RuleOptions,
  StyleSheetOptions,
  JssStyle,
  Classes,
  KeyframesMap,
  JssStyles,
  Renderer,
  UpdateArguments,
  UpdateOptions
} from './types'
import StyleSheet from './StyleSheet';

export default class AtomicStyleSheet extends StyleSheet {
  constructor(styles: JssStyles, options: StyleSheetOptions) {
    super(styles, options)
    this.attached = false
    this.deployed = false
    this.classes = {}
    this.keyframes = {}
    this.options = {
      ...options,
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    }
    if (options.Renderer) {
      this.renderer = new options.Renderer(this)
    }
    this.rules = new RuleList(this.options)

    for (const name in styles) {
      this.rules.add(name, styles[name])
    }

    this.rules.process()
  }
}

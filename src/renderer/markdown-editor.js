import { EditorState } from '@codemirror/state';
import { EditorView, keymap, placeholder } from '@codemirror/view';
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands';
import { markdown } from '@codemirror/lang-markdown';
import { bracketMatching, defaultHighlightStyle, indentOnInput, syntaxHighlighting } from '@codemirror/language';
import { closeBrackets, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { Table } from '@lezer/markdown';
import {
  collapseOnSelectionFacet,
  editorTheme,
  imageField,
  linkPlugin,
  livePreviewPlugin,
  markdownStylePlugin,
  mouseSelectingField,
  setMouseSelecting,
  tableField,
} from 'codemirror-live-markdown';

const editors = new Map();

const iterselfEditorTheme = EditorView.theme({
  '&': {
    height: '100%',
    color: 'var(--text)',
    backgroundColor: 'transparent',
    fontSize: '15px',
    '--foreground': 'var(--cm-md-foreground)',
    '--md-heading': 'var(--cm-md-heading)',
    '--md-bold': 'var(--cm-md-heading)',
    '--md-italic': 'var(--cm-md-foreground)',
    '--md-link': 'var(--cm-md-accent)',
    '--md-code': 'var(--cm-md-foreground)',
  },
  '&.cm-focused': {
    outline: 'none',
  },
  '.cm-scroller': {
    height: '100%',
    overflow: 'auto',
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    lineHeight: '1.75',
  },
  '.cm-content': {
    minHeight: '100%',
    padding: '20px 24px 32px',
    caretColor: 'var(--text)',
  },
  '.cm-line': {
    padding: '0',
  },
  '.cm-activeLine': {
    backgroundColor: 'transparent',
  },
  '.cm-selectionBackground, ::selection': {
    backgroundColor: 'color-mix(in srgb, var(--accent) 30%, transparent) !important',
  },
  '.cm-cursor': {
    borderLeftColor: 'var(--text)',
  },
  '.cm-tooltip': {
    backgroundColor: 'var(--panel)',
    color: 'var(--text)',
    borderColor: 'var(--line)',
  },
  '.cm-placeholder': {
    color: 'var(--muted)',
  },
  '.cm-line.cm-md-heading': {
    letterSpacing: '-0.03em',
  },
  '.cm-line.cm-md-heading, .cm-md-heading, .cm-header, .cm-strong': {
    color: 'var(--text) !important',
  },
  '.cm-formatting, .cm-meta': {
    color: 'var(--muted) !important',
  },
  '.cm-md-link': {
    color: 'var(--accent) !important',
  },
  '.cm-md-code, .cm-md-codeblock': {
    backgroundColor: 'var(--input)',
    borderRadius: '8px',
  },
});

function createExtensions() {
  return [
    markdown({ extensions: [Table] }),
    history(),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    highlightSelectionMatches(),
    placeholder('开始写 Markdown…'),
    collapseOnSelectionFacet.of(true),
    mouseSelectingField,
    livePreviewPlugin,
    markdownStylePlugin,
    tableField,
    imageField(),
    linkPlugin(),
    editorTheme,
    iterselfEditorTheme,
    syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    keymap.of([
      indentWithTab,
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...historyKeymap,
      ...searchKeymap,
      ...completionKeymap,
    ]),
  ];
}

function mount(id, parent, value = '') {
  if (!parent) return null;
  destroy(id);
  parent.innerHTML = '';
  const view = new EditorView({
    parent,
    state: EditorState.create({
      doc: value,
      extensions: createExtensions(),
    }),
  });

  view.contentDOM.addEventListener('mousedown', () => {
    view.dispatch({ effects: setMouseSelecting.of(true) });
  });
  document.addEventListener('mouseup', () => {
    requestAnimationFrame(() => {
      if (!editors.has(id)) return;
      view.dispatch({ effects: setMouseSelecting.of(false) });
    });
  });

  editors.set(id, view);
  requestAnimationFrame(() => view.focus());
  return view;
}

function destroy(id) {
  const view = editors.get(id);
  if (!view) return false;
  view.destroy();
  editors.delete(id);
  return true;
}

function getValue(id) {
  const view = editors.get(id);
  return view ? view.state.doc.toString() : '';
}

function setValue(id, value = '') {
  const view = editors.get(id);
  if (!view) return false;
  view.dispatch({
    changes: { from: 0, to: view.state.doc.length, insert: value },
  });
  view.focus();
  return true;
}

window.IterSelfMarkdownEditor = {
  mount,
  destroy,
  getValue,
  setValue,
};

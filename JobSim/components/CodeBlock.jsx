import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Osnovni regexi za barvanje JS kode
const KEYWORDS = [
  'function', 'return', 'if', 'else', 'let', 'const', 'var', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'typeof', 'instanceof', 'in', 'of', 'await', 'async', 'import', 'from', 'export', 'class', 'extends', 'super', 'constructor', 'static', 'get', 'set', 'this', 'true', 'false', 'null', 'undefined'
];
const KEYWORD_REGEX = new RegExp(`\\b(${KEYWORDS.join('|')})\\b`);
const STRING_REGEX = /(['"`])(?:(?=(\\?))\\2.)*?\1/;
const COMMENT_REGEX = /(\/\/.*|\/\*[\s\S]*?\*\/)/;
const NUMBER_REGEX = /\b(\d+(?:\.\d+)?)\b/;

function highlightLine(line, lineIdx, parentKey = '') {
  let elements = [];
  let rest = line;
  let keyCounter = 0;

  // Komentar na koncu vrstice
  const commentMatch = rest.match(COMMENT_REGEX);
  if (commentMatch && commentMatch.index !== undefined) {
    const before = rest.slice(0, commentMatch.index);
    const comment = commentMatch[0];
    if (before) elements = elements.concat(highlightLine(before, lineIdx, parentKey + 'c'));
    elements.push(
      <Text key={`c${lineIdx}-${parentKey}${keyCounter++}`} style={styles.comment}>{comment}</Text>
    );
    return elements;
  }

  // String na začetku
  const stringMatch = rest.match(STRING_REGEX);
  if (stringMatch && stringMatch.index === 0) {
    elements.push(
      <Text key={`s${lineIdx}-${parentKey}${keyCounter++}`} style={styles.string}>{stringMatch[0]}</Text>
    );
    rest = rest.slice(stringMatch[0].length);
    if (rest) elements = elements.concat(highlightLine(rest, lineIdx, parentKey + 's'));
    return elements;
  }

  // Ključna beseda na začetku
  const keywordMatch = rest.match(KEYWORD_REGEX);
  if (keywordMatch && keywordMatch.index === 0) {
    elements.push(
      <Text key={`k${lineIdx}-${parentKey}${keyCounter++}`} style={styles.keyword}>{keywordMatch[0]}</Text>
    );
    rest = rest.slice(keywordMatch[0].length);
    if (rest) elements = elements.concat(highlightLine(rest, lineIdx, parentKey + 'k'));
    return elements;
  }

  // Številka na začetku
  const numberMatch = rest.match(NUMBER_REGEX);
  if (numberMatch && numberMatch.index === 0) {
    elements.push(
      <Text key={`n${lineIdx}-${parentKey}${keyCounter++}`} style={styles.number}>{numberMatch[0]}</Text>
    );
    rest = rest.slice(numberMatch[0].length);
    if (rest) elements = elements.concat(highlightLine(rest, lineIdx, parentKey + 'n'));
    return elements;
  }

  // Poišči naslednji specialen token
  let nextTokenIndex = rest.length;
  [COMMENT_REGEX, STRING_REGEX, KEYWORD_REGEX, NUMBER_REGEX].forEach((regex) => {
    const m = rest.match(regex);
    if (m && m.index !== undefined && m.index < nextTokenIndex && m.index !== 0) {
      nextTokenIndex = m.index;
    }
  });
  if (nextTokenIndex > 0 && nextTokenIndex < rest.length) {
    elements.push(
      <Text key={`t${lineIdx}-${parentKey}${keyCounter++}`}>{rest.slice(0, nextTokenIndex)}</Text>
    );
    rest = rest.slice(nextTokenIndex);
    if (rest) elements = elements.concat(highlightLine(rest, lineIdx, parentKey + 't'));
    return elements;
  }

  // Če ni več posebnih tokenov, vrni preostanek
  if (rest) {
    elements.push(
      <Text key={`r${lineIdx}-${parentKey}${keyCounter++}`}>{rest}</Text>
    );
  }
  return elements;
}

export default function CodeBlock({ code, style, scrollable = true, maxHeight = 320 }) {
  // Popravek: odstrani odvečne ničle in presledke v številkah (npr. 00 -> 0, 1010 -> 10, 22 -> 2)
  // in normalizira kodo (le za prikaz, ne za logiko!)
  const normalizedCode = code
    .replace(/\b0+(\d+)/g, '$1') // 00 -> 0, 01 -> 1
    .replace(/(\d)0{2,}/g, '$1'); // 1010 -> 10, 220 -> 20
  const lines = normalizedCode.split('\n');
  const content = (
    <View style={[styles.codeBox, style, scrollable && { maxHeight }]}> 
      {lines.map((line, idx) => (
        <Text key={idx} style={styles.codeText} selectable>
          {highlightLine(line, idx, '')}
        </Text>
      ))}
    </View>
  );
  if (scrollable) {
    return (
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }} horizontal={false}>
        {content}
      </ScrollView>
    );
  } else {
    return content;
  }
}

const styles = StyleSheet.create({
  codeBox: {
    backgroundColor: '#23272e',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  codeText: {
    fontFamily: 'monospace',
    color: '#fff',
    fontSize: 15,
  },
  keyword: {
    color: '#ffb347',
  },
  string: {
    color: '#b5f4a5',
  },
  comment: {
    color: '#aaa',
    fontStyle: 'italic',
  },
  number: {
    color: '#f78c6c',
  },
});

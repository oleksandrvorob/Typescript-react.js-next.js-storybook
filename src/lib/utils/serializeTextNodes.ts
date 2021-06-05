import { Node } from 'slate'

// serializes the comment nodes in plain text
export const serialize = (nodes) => {
  return nodes.map((n) => Node.string(n)).join('\n')
}

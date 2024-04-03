import { codeToHtml, type BuiltinLanguage } from 'shiki'

import { Example } from '~/components/code-provider'

import { maskApiKey } from './apikey'
import { env } from './env'

export async function highlight(code: string, lang: BuiltinLanguage) {
  return await codeToHtml(code, { lang, theme: 'github-dark' })
}

export async function generateCodeExamples(user: {
  apiKey: string
}): Promise<Example[]> {
  const javascript = await highlight(
    `fetch('${env.NEXT_PUBLIC_API_URL}/enqueue', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer ${maskApiKey(user.apiKey)}' 
  },
  body: JSON.stringify({
    payload: {
      userId: 777,
      postId: 1234
    },
    handler: 'mydomain.com/test-endpoint',
    method: 'POST'
  })
})`,
    'javascript',
  )

  const curl = await highlight(
    `curl -X POST \\
-H 'Authorization: Bearer ${maskApiKey(user.apiKey)}' \\
-d '{ payload: { userId: 777, postId: 1234 }, handler: 'mydomain.com/test-endpoint', method: "POST" }' \\
${env.NEXT_PUBLIC_API_URL}/enqueue
`,
    'shell',
  )

  const php = await highlight(
    `$client = new GuzzleHttp\\Client();

$response = $client->request(
  'POST',
  '${env.NEXT_PUBLIC_API_URL}/enqueue',
  [
    'headers' => [
      'Authorization' => 'Bearer ${maskApiKey(user.apiKey)}',
    ],
    'body' => [
      'payload' => [
        'userId' => 777,
        'postId' => 1234,
      ],
    ],
    'handler' => 'mydomain.com/test-endpoint',
      'method' => 'POST',
    ],
  ],
);
`,
    'php',
  )

  return [
    { language: 'javascript', code: javascript },
    { language: 'shell', code: curl },
    { language: 'php', code: php },
  ]
}

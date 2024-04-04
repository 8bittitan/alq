import { codeToHtml, type BuiltinLanguage } from 'shiki'

import { Example } from '~/components/code-provider'

import { maskApiKey } from './apikey'
import { env } from './env'

async function highlight(code: string, lang: BuiltinLanguage) {
  return await codeToHtml(code, { lang, theme: 'github-dark' })
}

function jsCodeExample(apiKey: string) {
  return `fetch('${env.NEXT_PUBLIC_API_URL}/enqueue', {
  method: 'POST',
  headers: { 
    'X-API-Key': '${apiKey}' 
  },
  body: JSON.stringify({
    payload: {
      userId: 777,
      postId: 1234
    },
    handler: 'mydomain.com/test-endpoint',
    method: 'POST'
  })
})`
}

function curlCodeExamples(apiKey: string) {
  return `curl -X POST \\
  -H "X-API-Key: ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{ "payload": { "userId": 777, "postId": 1234 }, "handler": "mydomain.com/test-endpoint", "method": "POST" }' \\
  ${env.NEXT_PUBLIC_API_URL}/enqueue
`
}

function phpCodeExample(apiKey: string) {
  return `$client = new GuzzleHttp\\Client();

$response = $client->request(
  'POST',
  '${env.NEXT_PUBLIC_API_URL}/enqueue',
  [
    'headers' => [
      'X-API-Key' => '${apiKey}',
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
`
}

export async function generateCodeExamples(user: {
  apiKey: string
}): Promise<Example[]> {
  const maskedApiKey = maskApiKey(user.apiKey)

  const javascript = await highlight(jsCodeExample(maskedApiKey), 'javascript')
  const curl = await highlight(curlCodeExamples(maskedApiKey), 'shell')
  const php = await highlight(phpCodeExample(maskedApiKey), 'php')

  const jsCopyString = jsCodeExample(user.apiKey)
  const curlCopyString = curlCodeExamples(user.apiKey)
  const phpCopyString = phpCodeExample(user.apiKey)

  return [
    { language: 'javascript', code: javascript, copyString: jsCopyString },
    { language: 'shell', code: curl, copyString: curlCopyString },
    { language: 'php', code: php, copyString: phpCopyString },
  ]
}

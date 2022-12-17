import { Router } from 'itty-router'
import { html } from './html'
const router = Router()

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
}

class ElementHandler {
  element(element) {
		if(element.tagName == 'body') {
			element.replace(`<body>Hello, world!</body>`);
		}
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}


router.get('/m/:server/:user', async(req, env, ctx) => {
	const { params, query, headers } = req

	// If the useragent is User-agent: Twitterbot/1.0, fetch the passed parameter and return its meta tags
	// If the useragent is not Twitterbot, return a redirect to the passed parameter url
	console.log(req.headers.get('User-Agent'))
	let userAgent = req.headers.get('User-Agent')
	if (userAgent.includes('Twitterbot') || userAgent.includes('Iframely')) {
		// @ts-ignore
		const toot_url = `https://${params.server}/${params.user}`
		const res = await fetch(toot_url)
		const only_meta = new HTMLRewriter().on('meta', new ElementHandler()).transform(res)
		const removed_body = new HTMLRewriter().on('body', new ElementHandler()).transform(only_meta)
		return removed_body;
	}else{
		// redirect to tooting
		return Response.redirect(`https://${params.server}/${params.user}`, 302)
	}


})
// 404 for everything else
router.all('*', (request, args) => {
	// print the request url host
	console.log(`Request URL: ${request.url}`)
	return new Response(html(request.url), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
})

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		return await router.handle(request, env, ctx)
	},
};



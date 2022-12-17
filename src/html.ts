//create an exportable string
export const html = (url: String) =>{
 return `
<!DOCTYPE html>
<html>
  <head>
    <title>Tut Linker - Generate SEO friendly mastodon links</title>
    <meta name="description" content="Easily deployable mini app that wraps mastodon links with an SEO friendly (and unbannable) link">
    <!-- Add a link to the Tailwind CSS stylesheet -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp"></script>
    
    <script type="module">
      import { createApp } from 'https://unpkg.com/petite-vue@0.2.2/dist/petite-vue.es.js'
        
      createApp({
        // exposed to all expressions
        count: 0,
        username: '',
        server: '',
        // getters
        get combined() {
            if (this.username && this.server) {
                let timestamp = new Date().getTime();
                return '${url}m/' + this.server + '/@' + this.username + '?t=' + timestamp;      
            }else{
                return ''
            }
        },
        // methods
        increment() {
          this.count++
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.combined)
        },
        tweet() {
            //escape this.combined
            const escaped = encodeURIComponent(this.combined)
            window.open('https://twitter.com/intent/tweet?text=' + escaped, '_blank');
        }
      }).mount()
    </script>
    <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            clifford: '#da373d',
          }
        }
      }
    }
  </script>
  </head>
  <body class="text-clifford" v-scope="{ count: 0 }">
  <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
  <img src="https://images.unsplash.com/photo-1545431781-3e1b506e9a37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 opacity-25" width="1308" />
  <div class="absolute inset-0 bg-[url(/img/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
  <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
    <div class="mx-auto max-w-md">
      <h1 class="text-2xl">Tut Linker</h1>
      <div class="divide-y divide-gray-300/50">
        <div class="space-y-6 py-8 text-base leading-7 text-gray-600">
          <p>
            <b>What is this?</b> <br />
            Well, if you are new to Mastodon, and want to share your new profile on certain social media websites, some of them are now marking mastodon domains as malicious. Talk about freedom of speech eh?
            <br />
            Share this link instead, and Twitter will show the SEO tags from your mastodon profile, but without the ban!
          </p>
          <ul class="space-y-4">
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <div class="ml-4">
                <label for="server" class="block text-sm font-medium text-gray-700">Your mastodon server:</label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">http://</span>
                  <input v-model="server" type="text" name="server" id="server" class="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="mastodon.social" />
                </div>
              </div>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <div class="ml-4">
                <label for="nickname" class="block text-sm font-medium text-gray-700">Your username:</label>
                <div class="relative flex flex-grow items-stretch focus-within:z-10">
                  <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <!-- Heroicon name: mini/users -->
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                     <path stroke-linecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                   </svg>
                  </div>
                  <input v-model="username" type="text" name="nickname" id="nickname" class="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="altryne" />
                </div>
              </div>
            </li>
            <li class="flex items-center">
              <svg class="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="11" />
                <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
              </svg>
              <p class="ml-4">Click "copy" and an unbannable link will be generated</p>
            </li>
          </ul>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"></label>
            <div class="mt-1 flex rounded-md shadow-sm">
              <div class="relative flex flex-grow items-stretch focus-within:z-10">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <!-- Heroicon name: mini/users -->
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                  </svg>
                </div>
                <input v-model="combined" type="text" name="email" id="email" disabled class="block w-full rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="You un-bannable link will appear here" />
              </div>
              <button @click="copyToClipboard()" type="button" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-none border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <!-- Heroicon name: mini/bars-arrow-up -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                </svg>
                <span>Copy</span>
              </button>
              <button @click="tweet()" type="button" class="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <!-- Heroicon name: mini/bars-arrow-up -->
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <span>Tweet</span>
              </button>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center">
              <span class="bg-white px-2 text-sm text-gray-500">About</span>
            </div>
          </div>
          <div>Built with cloudflare workers so anyone can <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/altryne/tut-linker" target="_blank"><img class="inline-block h-5" alt="Deploy to CloudFlare" src="https://deploy.workers.cloudflare.com/button" /></a> their own version, on their own domain if they want to.</div>
          <a href="https://twitter.com/intent/follow?screen_name=altryne" target="_blank"><img class="inline-block" alt="Twitter Follow" src="https://img.shields.io/twitter/follow/altryne?label=%40altryne&style=social" /></a>
          <a href="https://techhub.social/@altryne" target="_blank"><img class="inline-block" alt="Mastodon Follow" src="https://img.shields.io/mastodon/follow/109524680848021421?domain=https%3A%2F%2Ftechhub.social&label=%40altryne%40techhub.social&style=social" /></a>
          <a href="https://github.com/altryne/tut-linker" target="_blank"><img class="inline-block" alt="Github" src="https://img.shields.io/github/stars/altryne/tut-linker?label=%40altryne%2Ftut-linker&style=social" /></a>
        </div>
      </div>
    </div>
  </div>
</div>

    <!-- Add a script to handle the form submission and copy the Mastodon link to the clipboard -->
    
  </body>
</html>
`
}
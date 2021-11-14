// add and export a function called `log`

const log = async ({ request }, next) => {
    console.log(`${request.method} ${request.url.pathname}`);
    await next();
  };
  
  export { log };
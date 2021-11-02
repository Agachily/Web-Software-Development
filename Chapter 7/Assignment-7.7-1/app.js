import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts";
import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as chatService from "./services/chatService.js"

/**配置eta文件所在的目录 */
configure({
  views: `${Deno.cwd()}/views/`
})

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

/**配置用于重定向的函数 */
const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
}

/**对所获取到的数据 (result.rows) 进行处理和排序 */
const processData = (data) => {
  /**将数组进行反转，因为id越大表示数据越新 */
  let newData = data.reverse()
  if (newData.length > 5) {
    newData = newData.slice(0, 5)
  }
  return newData
}

/**展示所获取到的数据和用于发送数据的表格 */
const showData = async () => {
  let result = await chatService.getData()
  result = processData(result)

  const data = {
    message: result
  }

  return new Response(await renderFile("index.eta", data), responseDetails);
}

/**添加新的消息 */
const addData = async (request) => {
  const formData = await request.formData();
  const sender = formData.get("sender")
  const message = formData.get("message")

  await chatService.create(sender, message)
  return redirectTo("/")
}

const handleRequest = async (request) => {
  const url = new URL(request.url);
  if (request.method === "POST" && url.pathname === "/"){
    return await addData(request)
  } else {
    return await showData(request)
  }
};

listenAndServe(":7777", handleRequest);


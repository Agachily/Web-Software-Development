import { lastUploadedId } from "../../services/fileService.js"
import * as base64 from "https://deno.land/x/base64@v0.2.1/mod.ts"
import * as bcrypt from "https://deno.land/x/bcrypt@v0.2.4/mod.ts"
import { executeQuery } from "../../database/database.js"

const viewForm = async ({ render }) => {
  const lastId = await lastUploadedId();
  render("index.eta", {
    last_id: lastId,
  });
};

const processFile = async ({request, response}) => {
  /** Get the hash of password */
  let password = `${Math.floor(100000 * Math.random())}`
  const hash = await bcrypt.hash(password)
  /** Process the request */
  const body = request.body({type: "form-data"})
  const reader = await body.value
  const data = await reader.read()
  for (let i =0; i < data.files.length; i++ ){
    const fileDetails = data.files[i]

    /** Reading and encoding */
    const fileContents = await Deno.readAll(await Deno.open(fileDetails.filename))
    const base64Encoded = base64.fromUint8Array(fileContents)

    /** Stored related information to the database */
    await executeQuery("INSERT INTO miniupload_files (type, name, data, password) VALUES ($1, $2, $3, $4);",
    fileDetails.contentType,
    fileDetails.originalName,
    base64Encoded,
    hash)
  }
  /** Response with the password */
  response.body = password
}

const getFile = async ({request, response}) => {
  /** Get the sent password and id */
  const body = request.body({type: "form"})
  const params = await body.value
  const password = params.get("password")
  const id = params.get("id")

  const res = await executeQuery("SELECT * FROM miniupload_files WHERE id=($1)", id)

  if (res.rows.length === 0) {
    response.status = 401
    return
  }

  const obj = res.rows[0]
  const hash = obj.password
  /** Verify the password */
  const passwordCorrect = await bcrypt.compare(password, hash)
  if (!passwordCorrect) {
    response.status = 401
    return
  }
  response.headers.set('Content-Type', obj.type);
  const arr = base64.toUint8Array(obj.data);
  response.headers.set('Content-Length', arr.length);
  response.body = arr
}

export { viewForm, processFile, getFile };

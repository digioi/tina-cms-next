import Cors from "micro-cors"
import * as gitApi from '@tinacms/api-git'


const cors = Cors({
  allowMethods: ['GET', 'HEAD', 'POST', 'PUTS', 'DELETE'],
})

const handler = gitApi.router({
  pathToRepo: process.cwd(),
  pathToContent: "",
});

export default cors(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}

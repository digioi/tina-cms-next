import Head from 'next/head';
import ReactMarkdown from 'react-markdown'

import { inlineJsonForm } from 'next-tinacms-json';
import { Wysiwyg } from '@tinacms/fields'
import { TinaField } from '@tinacms/form-builder'

const formOptions = {
  label: 'Index Page',
  fields: [{
    name: 'title',
    component: 'text',
    label: 'Title',
    description: 'Main Title',
  },{
    name: 'body',
    component: 'textarea',
    label: 'Description',
    description: 'Main Content',
  }],
}

const Home = ({ jsonFile, setIsEditing, isEditing }) => {
  const { title, body } = jsonFile
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={() => setIsEditing(p => !p)}>
        {isEditing ? 'Preview' : 'Edit'}
      </button>

      <main>
        
        <TinaField name="title" Component={Wysiwyg}>
          <h1>{title}</h1>
        </TinaField>

        <TinaField name="body" Component={Wysiwyg}>
          <ReactMarkdown>
            {body}
          </ReactMarkdown>
        </TinaField>
        
      </main>

    </div>
  )
};

const ExportHome = inlineJsonForm(Home, formOptions)

export default ExportHome

ExportHome.getInitialProps = async function (ctx) {
  let content = await import(`../data/index.json`)
  return {
    jsonFile: {
      fileRelativePath: `data/index.json`,
      data: content
    }
  }
}
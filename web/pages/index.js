import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useCallback, useState } from 'react'

import { useDropzone } from 'react-dropzone'


export default function Home() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  const onDrop = useCallback(acceptedFiles => {

    acceptedFiles.forEach((file) => {
      const formData = new FormData();
      formData.append('file', file)
      console.log('post data: ', formData)
      setLoading(true)
      fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          setData(data?.data)
          setLoading(false)
        })
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: ['audio/m4a'],
    maxFiles: 1,
    maxSize: 16 * 1000 * 1000
  })

  return (
    <div className={styles.container + ' text-center'}>
      <Head>
        <title>Best transcibe audio to text</title>
        <meta name="description" content="Best transcibe audio to text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title + ' text-3xl'}>
       新世代AI音频转化器
      </h1>

      <main className={styles.main}>
        <section className={styles.options + ' ' + 'border-2 border-grey hidden'}>
          配置区域
        </section>
        <section className={styles.uploadContainer + ' ' + 'border-2 border-dashed border-grey'} {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>松掉鼠标,我就开始上传啰</p> :
              <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>拖拽或点击上传</p>
          }
        </section>

        <section className={styles.results + ' border-2 border-grey'}>
          {data ? data.text : <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>文本会处理到这里哟</p>}
        </section>
      </main>
    </div>
  )
}

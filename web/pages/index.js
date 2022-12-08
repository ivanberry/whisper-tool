import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useCallback, useEffect, useState } from 'react'
import { signIn, signOut, useSession } from "next-auth/react"

import { useDropzone } from 'react-dropzone'


export default function Home() {

  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [filepath, setFilepath] = useState('')
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('status: ', status, data, session)
  }, [])

  const onDrop = useCallback(acceptedFiles => {

    acceptedFiles.forEach((file) => {
      setFilepath(file.path)
      setLoading(true)
      const formData = new FormData();
      formData.append('file', file)
      fetch('/p/api/transcribe', {
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

  const handleClick = async () => {
    signIn()
  }

  const handleLogout = () => {
    signOut();
  }

  const handleFileDownload = () => {
    // pass download file from server
    // how to connect with the file
    // some id?
    // md5 checksum
  }

  const handleFileRemove = (e) => {
    e.stopPropagation()
    setFilepath('')
  }

  return (
    <div className={styles.container + ' text-center'}>
      <Head>
        <title>Best transcibe audio to text</title>
        <meta name="description" content="Best transcibe audio to text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className='flex justify-between items-center'>
        <h1 className={styles.title + ' text-3xl'}>
          新世代AI音频转化器
        </h1>
        {session ?
          <div className='flex justify-around items-center min-w-[200px]'>
            {/* <img className='rounded-full' width={30} height={30} src={session.user.image} alt="userImage" />
            <span className='m-2 p-1 border-[1px] border-solid border-slate-300'>{session.user.name}</span>
            <span className='p-1 border-[1px] border-solid border-slate-300' onClick={handleLogout}>Logout</span> */}
          </div>
          :
          <button onClick={handleClick}>Sign In</button>}
      </header>

      <main className={styles.main}>
        <section className={styles.options + ' ' + 'border-2 border-grey'}>
          配置区域
        </section>
        <section className={styles.uploadContainer + ' ' + 'border-2 border-dashed border-grey'} {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>松掉鼠标,我就开始上传啰</p> :
              <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>拖拽或点击上传</p>
          }

          {
            filepath ?
              <ul className='absolute bottom-0 text-gray-400 w-full'>
                <li className='flex justify-between w-full'>
                  <p>{filepath}</p>
                  <button onClick={handleFileRemove}>移除</button>
                </li>
              </ul>
              : null
          }
        </section>

        <section className={styles.results + ' border-2 border-grey'}>
          <div className='relative h-[15%] bg-slate-100 text-left'>
            {data ? data.text : <p className={styles.absoluteCenter + ' text-xl italic text-slate-300'}>
              {
                isLoading ? 'isLoading' : 'values'
              }
            </p>
            }
          </div>
          <div>
            <span onClick={handleFileDownload}>
              download files
            </span>
          </div>
        </section>
      </main>
    </div>
  )
}

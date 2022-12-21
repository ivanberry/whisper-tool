import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { useDropzone } from "react-dropzone";
import Config from "../components/Config";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [filepath, setFilepath] = useState("");
  const { data: session, status } = useSession();

  const [needTranslate, setNeedTranslate] = useState(false);
  const [needToImg, setNeedToImg] = useState(false);

  const handleChange = (type) => {
    // handle the Config component state change
    if (type === "TRANSLATE") {
      setNeedTranslate((n) => !n);
    } else {
      setNeedToImg((n) => !n);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setLoading(true);
    acceptedFiles.forEach(async (file) => {
      setFilepath(file.path);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("translate", needTranslate);
      formData.append("toImage", needToImg);
      const response = await fetch("/api/predictions", {
        method: "POST",
        body: formData,
      });

      let prediction = await response.json();

      if (response.status !== 201) {
        // pass
        console.log(prediction.detail);
        return;
      }

      console.log("prediction: ", prediction);

      while (
        prediction.status !== "successed" &&
        prediction.status !== "failed"
      ) {
        await sleep(1000);
        const response = await fetch("/api/predictions/" + prediction?.id);
        prediction = await response.json();
        if (response.status !== 200) {
          // pass
          console.log(prediction.detail);
          return;
        }

        console.log("prediction: ", prediction);
      }

      // .then((res) => res.json())
      //         .then((data) => {
      //           setData(data?.data);
      //           setLoading(false);
      //         });
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: ['audio/m4a'],
    maxFiles: 1,
    maxSize: 16 * 1000 * 1000,
  });

  const handleClick = async () => {
    signIn();
  };

  const handleLogout = () => {
    signOut();
  };

  const handleFileDownload = () => {
    // pass download file from server
    // how to connect with the file
    // some id?
    // md5 checksum
  };

  const handleFileRemove = (e) => {
    e.stopPropagation();
    setFilepath("");
  };

  return (
    <div className={"container" + " text-center"}>
      <Head>
        <title>Best transcibe audio to text</title>
        <meta name="description" content="Best transcibe audio to text" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center">
        <h1 className={"title" + " text-3xl"}>新世代AI音频转化器</h1>
        {session ? (
          <div className="flex justify-around items-center min-w-[200px]">
            <img
              className="mask mask-heart"
              width={30}
              height={30}
              src={session.user.image}
              alt="userImage"
            />
            <span className="btn btn-outline btn-sm btn-primary m-2">
              {session.user.name}
            </span>
            <span
              className="btn btn-outline btn-sm btn-secondary border-[1px] border-solid border-slate-300"
              onClick={handleLogout}
            >
              Logout
            </span>
          </div>
        ) : (
          <button onClick={handleClick}>Sign In</button>
        )}
      </header>

      <main className={"main"}>
        <Config
          needToImg={needToImg}
          needTranslate={needTranslate}
          handleChange={handleChange}
        />

        <section
          className={
            "uploadContainer" + " " + "border-2 border-dashed border-grey"
          }
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className={"absoluteCenter" + " text-xl italic text-slate-300"}>
              松掉鼠标,我就开始上传啰
            </p>
          ) : (
            <p className={"absoluteCenter" + " text-xl italic text-slate-300"}>
              拖拽或点击上传
            </p>
          )}

          {filepath ? (
            <ul className="absolute bottom-0 text-gray-400 w-full">
              <li className="flex justify-between w-full">
                <p>{filepath}</p>
                <button onClick={handleFileRemove}>移除</button>
              </li>
            </ul>
          ) : null}
          <progress
            className="progress progress-accent w-full"
            value="30"
            max="100"
          ></progress>
        </section>

        <section className={"results" + " border-2 border-grey"}>
          <div className="relative h-[15%] bg-slate-100 text-left">
            {isLoading ? (
              "isLoading"
            ) : data ? (
              data.text
            ) : (
              <p
                className={"absoluteCenter" + " text-xl italic text-slate-300"}
              >
                转码结果
              </p>
            )}
          </div>
          <div>
            <span onClick={handleFileDownload}>下载</span>
          </div>
        </section>
      </main>
    </div>
  );
}

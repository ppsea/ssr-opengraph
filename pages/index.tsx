/**
 * Author : Henry
 * Date : 2021-06-01
 * Desc :
 */

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback } from "react";

type TProps = {
  title: string | undefined;
  url: string | undefined;
  keywords: string | undefined;
  description: string | undefined;
  image: string | undefined;
};

//  DEFAULT DATA
export const OG_TITLE = `default site title`;
export const OG_URL = `https://ssr-opengraph.vercel.app/`;
export const OG_KEYWORDS = "default1, default2, default3";
export const OG_DESCRIPTION = `default description`;
export const OG_IMAGE = `/static/logo.png`;

export default function index(props: TProps) {
  const title = props.title ? props.title : OG_TITLE;
  const keywords = props.keywords ? props.keywords : OG_KEYWORDS;
  const description = props.description ? props.description : OG_DESCRIPTION;
  const url = props.url ? props.url : OG_URL;
  const image = props.image ? props.image : OG_IMAGE;

  const shareLink = useCallback(() => {
    var text = document.createElement("textarea");
    text.innerText = `https://${window.location.host};
    document.body.appendChild(text);
    text.select();
    document.execCommand("copy");
    text.remove();
    alert("copied! share link with social medias. like facebook or linkedIn");
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />
      </Head>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ marginRight: "50px" }}>
          <h3>default</h3>
          <p> title: {OG_TITLE} </p>
          <p> keywords: {OG_KEYWORDS}</p>
          <p> description: {OG_DESCRIPTION}</p>
          <p> url: {OG_URL}</p>
          <p> image: {OG_IMAGE}</p>
        </div>
        <div>
          <h3>promised change</h3>
          <p> title: {dummyData.title} </p>
          <p> keywords: {dummyData.keywords}</p>
          <p> description: {dummyData.description}</p>
          <p> url: {dummyData.url}</p>
          <p> image: {dummyData.image}</p>
        </div>
      </div>
      <div>
        <h3>see the head tag in elements! what is changed?</h3>
        <button onClick={shareLink}>share link</button>
      </div>
    </>
  );
}

export const dummyData = {
  title: "title from server ",
  keywords: "server1, server2, server3",
  description: "this description is from server",
  url: "https://ssr-opengraph.vercel.app/",
  image: "/static/abc.png",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  //SERVER DATA
  //fake api
  const getDataAPI = () =>
    new Promise((resolve, reject) => {
      if (!dummyData) {
        return setTimeout(() => reject(new Error("no data found")), 250);
      }
      setTimeout(() => resolve(dummyData), 250);
    });

  const data = await getDataAPI();
  return {
    props: data,
  };
};

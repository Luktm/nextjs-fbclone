import React, { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { db, storage } from '../firebase';
import {
  collection,
  addDoc,
  serverTimestamp,
  DocumentReference,
  DocumentData,
  doc, 
  setDoc
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';

// firebase kick in
export default function InputBox(): JSX.Element {
  const { data } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [previewImageToPost, setPreviewImageToPost] = useState<string>();
  const [blogImageToPost, setBlobImageToPost] = useState<
    Blob | Uint8Array | ArrayBuffer
  >();

  let url: string;

  useEffect(() => {
    return () => {
      if (url != undefined) {
        URL.revokeObjectURL(url);
      }
    };
  }, []);

  async function sendPost(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current?.value) return;
    // collection(getFireStore(app), 'table_name')
    addDoc(collection(db, 'posts'), {
      message: inputRef.current?.value,
      name: data?.user?.email,
      image: data?.user?.image,
      timestamp: serverTimestamp(),
    })
      .then((doc: DocumentReference<DocumentData>) => {
        //   to check if got image then upload media to firebase storage by give created doc id
        if (blogImageToPost) {
          // before that we must create getStorage(app)
          const postRef = ref(storage, `posts/${doc.id}.jpg`);

          // upload file to storage
          uploadBytes(postRef, blogImageToPost)
            .then((snapshot) => {
              console.log('Uploaded a blob or file' + snapshot);
            })
            .catch((error) => {
              console.log(error);
            });

          // https://modularfirebase.web.app/common-use-cases/storage/
          const uploadTask = uploadBytesResumable(postRef, blogImageToPost);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            },
            (error) => {
              // Handle unsuccessful uploads
              console.log(error);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              // store at the db as part of the post
              getDownloadURL(ref(storage, 'posts')).then(url => {
                  const postRef = doc()
                  setDoc()
              });
            }
          );
        }
      })
      .catch((error) => console.log(error.message));

    inputRef.current!.value = '';
  }

  function addImageToPost(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files?.length === 0) {
      console.log('Please select image/video');
      return;
    }

    // preview use
    setPreviewImageToPost(URL.createObjectURL(files![0]));
    // to upload firebase as blob format
    setBlobImageToPost(files![0]);
    e.target.value = '';
  }

  function removeImage() {
    setPreviewImageToPost('');
  }

  return (
    <div className="mt-6 rounded-2xl bg-white p-2 font-medium text-gray-500 shadow-md">
      <div className="flex items-center space-x-4 p-4">
        {data?.user?.image && (
          <Image
            className="rounded-full"
            src={data?.user?.image}
            width={40}
            height={40}
            layout="fixed"
          />
        )}

        <form className="flex flex-1">
          <input
            ref={inputRef}
            className="h-12 flex-grow rounded-full bg-gray-100 px-5 focus:outline-none"
            type="text"
            placeholder={`What's on your mind, ${data?.user?.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>

        {previewImageToPost && (
          <div
            onClick={removeImage}
            className="cursor:pointer flex transform flex-col filter transition duration-150 ease-in hover:scale-105 hover:brightness-110"
          >
            <img
              className="h-10 object-contain"
              src={previewImageToPost}
              alt=""
            />
          </div>
        )}
      </div>

      <div className="flex justify-evenly border-t p-3">
        <div className="inputIcon">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>

        <div
          onClick={() => {
            filePickerRef.current?.click();
          }}
          className="inputIcon"
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
}

"use client";
import { Button } from "@/components/ui/button";

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Reorder } from "framer-motion";
import Image from "next/image";
import { UploadCloud, X } from "lucide-react";
import { v4 as uuid } from "uuid";
export default function DropZone({
  field,
  initialData,
}: {
  field: any;
  initialData: any;
}) {


  const [files, setFiles] = useState<{ preview: string; path: string }[]>(
    initialData
      ? [
          ...initialData.images.map((image: any) => ({
            ...image,
            preview: process.env.NEXT_PUBLIC_MEDIA_URL + image.path,
            id: uuid(),
            index: initialData.images.indexOf(image),
          })),
        ]
      : []
  );

  function nameLengthValidator(file: any) {
    const existingFileNames = new Set(files.map((file) => file.path));

    if (existingFileNames.has(file.path)) {
      return {
        code: "name-duppplex",
        message: `Name is larger than ${6} characters`,
      };
    }

    return null;
  }

  const onDrop = useCallback((acceptedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => {
        const concatList = [
          ...previousFiles,
          ...acceptedFiles.map((file: Blob | MediaSource) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
              id: uuid(),
              index: files.length,
            })
          ),
        ];

        // update index when new file is added
        const newList = [
          ...concatList.map((item: any) =>
            Object.assign(item, {
              id: uuid(),
              index: concatList.indexOf(item),
            })
          ),
        ];

        return [...newList];
      });
    }
  }, []);

  useEffect(() => {
    field.onChange(files);
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    // maxSize: 1024 * 1000,
    onDrop,
    validator: nameLengthValidator,
  });

  // useEffect(() => {
  //   // Revoke the data uris to avoid memory leaks
  //   return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, [files]);

  const removeFile = (id: any) => {
    setFiles((files) => {
      const filteredFiles = files.filter((file: any) => file.id !== id);
      const newList = [
        ...filteredFiles.map((item: any, index: number) =>
          Object.assign(item, {
            id: uuid(),
            index: filteredFiles.indexOf(item),
          })
        ),
      ];
      return [...newList];
    });
  };

  const removeAll = () => {
    setFiles([]);
  };
  // console.log("files", files);
  return (
    <div className="border  rounded-xl border-dashed   min-w-[800px]  px-8 pt-8 pb-2">
      <div {...getRootProps({})}>
        <input {...getInputProps()} />
        <div className="h-[300px] rounded-lg border border-dashed relative bg-[#F7F8F9] w-full ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center justify-center">
            <Image
              src={"/images/uploadsvgnew.svg"}
              width="120"
              height="120"
              alt="add icon"
            />
            <div className="text-center flex flex-col gap-2 items-center justifty-center">
              <h5 className="text-black font-[600]">Select files</h5>
              <span className="text-[#74838F] text-[12px] ">
                Drop files here or click{" "}
                <span className=" text-[12px] text-primary">browse</span>{" "}
                through your machine
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div>
          <Reorder.Group
            axis="x"
            className="flex items-center justify-start   gap-5"
            values={files}
            onReorder={
              (ev) => {
                const newList = [
                  ...ev.map((item: any) =>
                    Object.assign(item, {
                      index: ev.indexOf(item),
                    })
                  ),
                ];
                setFiles(newList);
              }
              // (ev) => {
              //   console.log("ev", ev);
              //   setFiles(ev);
              // }
            }
          >
            {files.map((file: any) => (
              <Reorder.Item
                key={file.id}
                value={file}
                className="relative cursor-grab"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-transparent z-20" />

                <Button
                  onClick={() => removeFile(file.id)}
                  type="button"
                  className="absolute   z-50 p-0 rounded-full flex items-center justify-center size-6 top-2 right-2"
                >
                  <X size={12} />
                </Button>
                <Image
                  src={file.preview}
                  alt={file.path}
                  width={100}
                  height={100}
                  onLoad={() => {}}
                  className=" rounded-md -z-10 "
                />
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>

        <div className=" w-full flex justify-end items-center gap-5">
          <Button
            type="button"
            size={"sm"}
            variant={"secondary"}
            onClick={() => removeAll()}
            className="mt-8     font-[600]   "
          >
            Remove All
          </Button>
          {/* <Button
            type="button"
            size={"sm"}
            className="mt-8   font-[600] flex items-center justify-center gap-2  "
            onClick={() => {}}
          >
            <UploadCloud size={19} className="font-medium" />
            <span>Upload</span>
          </Button> */}
        </div>
      </section>
    </div>
  );
}

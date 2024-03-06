import { FileImage, FilePlus, Globe } from "lucide-react";
import Image from "next/image";
import editor from "../../../public/editor-sidebar.png";
import darkEditor from "../../../public/editor-sidebar-dark.png";

export default function Features() {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)] dark:stroke-neutral-700"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              x="50%"
              y={-1}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg
            x="50%"
            y={-1}
            className="overflow-visible fill-gray-50 dark:fill-neutral-950/30"
          >
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
          />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                Your new Markdown editor
              </h1>
              <p className="text-muted-foreground mt-6 text-xl leading-8">
                Write is a powerful Markdown editor that allows you to write,
                edit, and share your documents with everyone.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            className="mt-12 w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] dark:hidden"
            src={editor}
            alt="Editor"
          />
          <Image
            className="mt-12 hidden w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] dark:block"
            src={darkEditor}
            alt="Editor"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className=" max-w-xl text-base leading-7 lg:max-w-lg">
              <p>
                Start your journey by creating a new project, whether it&apos;s
                from a template or starting from scratch. And if Markdown seems
                daunting, our built-in toolbar is there to guide you every step
                of the way.
              </p>
              <p className="py-4">
                Preview your masterpiece with ease using the preview mode,
                giving you a glimpse of how your document will look once
                it&apos;s published.
              </p>
              <p>
                When you&apos;re satisfied, share your document effortlessly
                with the world! Publish to the web and reach a wider audience.
                Need a PDF version? Exporting your document is just a click
                away.
              </p>
              <ul role="list" className="mt-8 space-y-8">
                <li className="flex gap-x-3">
                  <FilePlus
                    className="mt-1 h-5 w-5 flex-none text-purple-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold">Create.</strong>{" "}
                    Seamlessly create and edit your documents with Write&apos;s
                    intuitive Markdown editor. No more struggling with complex
                    formatting—focus on your content, and let Write handle the
                    rest.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <FileImage
                    className="mt-1 h-5 w-5 flex-none text-purple-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold">Import images.</strong>{" "}
                    Enhance your documents by importing images and other media
                    files. With Write, adding visual elements to your content
                    has never been easier.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <Globe
                    className="mt-1 h-5 w-5 flex-none text-purple-300"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold">Publish.</strong> Share
                    your creations with the world effortlessly. Whether
                    you&apos;re publishing to the web or exporting to PDF, Write
                    makes sharing your documents a breeze.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Experience the ease and power of Write today. Don&apos;t let the
                limitations of other platforms hold you back; with Write, the
                possibilities are endless. Embark on your creative journey with
                Write—where capturing, collaborating, and creating converge
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

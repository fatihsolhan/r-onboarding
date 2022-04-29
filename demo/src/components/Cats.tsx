
const ImageWrapper = ({ children, id }: { children?: JSX.Element; id?: string }) => {
  return (
    <div id={id} className="flex flex-col items-center justify-center border-2 border-white border-solid w-full aspect-video">
      {children}
    </div>)
}

export default function Cats({ cats }: { cats: {name: string; image_link: string}[] }) {
  if (!cats.length) return null
  return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-6" id="cats">
        {cats.map((cat, index) => <ImageWrapper id={`cat-${index}`} key={index}><img className="w-full h-full object-cover" src={cat.image_link} /></ImageWrapper>)}
      </div>
  )
}

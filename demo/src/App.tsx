import { ROnboardingWrapper, useROnboarding } from 'r-onboarding';
import 'r-onboarding/dist/style.css';
import { StepEntity } from 'r-onboarding/src/types/StepEntity';
import { useEffect, useRef, useState } from 'react';
import Button from "./components/Button";
import Cats from './components/Cats';
import Header from "./components/Header";
interface Cat {
  origin: string;
  name: string;
  length: string;
  image_link: string;
}
function App() {
  const wrapperRef = useRef(null)
  const { start, goToStep, finish } = useROnboarding(wrapperRef)
  const [showCats, setShowCats] = useState(false)
  const [cats, setCats] = useState<Cat[]>([])
  const fetchCats = async () => {
    const result = await fetch("https://api.api-ninjas.com/v1/cats?min_life_expectancy=1", {
      headers: {
        "X-API-KEY": "LUtgGg3Y+UnesrnU3v+daQ==o1VRpX0ymNwBCtnq",
      }
    }).then(res => res.json())
    setCats(result.slice(0, 4))
  }
  useEffect(() => {
    fetchCats()
  }, [])
  const [steps, setSteps] = useState<StepEntity[]>([])
  useEffect(() => {
    const s = cats.map((cat, index) => {
      return {
        attachTo: {
          element: `#cat-${index}`
        },
        content: {
          title: cat.name,
          description: `This cat's origin is ${cat.origin}. It's length is ${cat.length}.`,
        }
      }
    })
    setSteps([
      {
        attachTo: {
          element: "h1",
        },
        content: {
          title: 'Nice to see you here!',
          description: 'You can use r-onboarding to show some information about your app, or to explain how to use it',
        }
      },
      {
        attachTo: {
          element: "#cats",
        },
        content: {
          title: 'Here is some cat breeds to show you how r-onboarding works',
          description: 'Click next to see information about each cat.',
        }
      },
      ...s
    ])
  }, [cats])
  const see = () => {
    if (!showCats) {
      setShowCats(true)
    }
      goToStep(0)
  }
  const [loading, setLoading] = useState(false);
  return (
    <div>
    <div className="min-h-screen pb-32">
      {
        // @ts-expect-error
        <ROnboardingWrapper ref={wrapperRef} steps={steps} />}
      <Header />
      <div className="max-w-3xl mx-auto px-4">
        <div className="w-auto px-4 pt-16 pb-8 mx-auto sm:pt-24 lg:px-8">
          <h1 className="max-w-5xl text-center mx-auto text-4xl font-extrabold sm:text-7xl lg:text-8xl xl:text-8xl !leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#61dafb] via-[#61dafb] to-white">r-onboarding</h1>
          <p className="mx-auto mt-6 text-lg sm:text-xl font-medium leading-tight text-center text-gray-400">r-onboarding is a super-slim, fully-typed onboarding component for React</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4 ">
          <Button loading={loading} variant="primary" onClick={see}>See it in action</Button>
          <a href="https://r-onboarding-docs.fatihsolhan.com">
            <Button variant="secondary">Documentation</Button>
          </a>
        </div>
      </div>
      {showCats && <div className="container mt-12 max-w-4xl px-4">
        <Cats cats={cats} />
      </div>}
    </div>
    </div>
  )
}



export default App

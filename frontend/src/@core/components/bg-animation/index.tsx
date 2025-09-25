// ** React Imports
import { useEffect, useState } from 'react'

// ** Animation Imports
import { loadSlim } from '@tsparticles/slim'
import Particles, { initParticlesEngine } from '@tsparticles/react'

// ** Config Import
import { particles } from 'src/configs/particles'

const BgAnimation = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])
  if (!init) return <></>

  return <Particles id='tsparticles' options={particles} />
}

export default BgAnimation

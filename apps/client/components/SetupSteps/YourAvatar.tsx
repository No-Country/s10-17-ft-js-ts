import style from './style.module.scss'
import { useSetupSteps } from 'hooks/useSetupSteps'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from 'hooks/useSession'
import { useRouter } from 'next/navigation'

export function YourAvatar () {
  const links = [
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119137/Frame_427319173_mkkbvk.png', // Baby Yoda
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119137/Frame_427319174_mwtp3c.png', // Bob esponja pez
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119138/Frame_427319172_brqlz5.png', // Dogecoin
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119138/Frame_427319175_fd2pvk.png', // Kenny
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119138/Frame_427319176_fma6n0.png', // Is this a pigeon?
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119140/Frame_427319177_zm4bkg.png', // Gatito 1 (blanco y negro)
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119140/Frame_427319178_shkt4d.png', // Conejo rosa ?
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119140/Frame_427319179_xrik1g.png', // mike wazowski
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119141/Frame_427319180_zk4jam.png', // Pikachu
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119142/Frame_427319181_h6l9yu.png', // Burbuja conejo
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119143/Frame_427319182_cyjlem.png', // bugs bunny "no"
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119143/Frame_427319183_lugruq.png', // perrito ansiedad
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119144/Frame_427319184_feqaw2.png', // kirby cuchillo
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119144/Frame_427319185_obhw6q.png', // lisa anonadada
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119145/Frame_427319186_eacqcw.png', // homero meme arbusto
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119146/Frame_427319187_c6ldi6.png', // Jerry triangulo
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119147/Frame_427319188_koiyx2.png', // Pepino rick
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119147/Frame_427319165_t0sp5y.png', // Meme abuelo sonrisa
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119148/Frame_427319166_hnpy4g.png', // Mono mirada verguenza ajena
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119149/Frame_427319167_zu8tts.png', // Calamardo Modelo
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119149/Frame_427319168_v74gcj.png', // pepo sadge
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119149/Frame_427319169_mrz7tb.png', // Di caprio meme
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119150/Frame_427319170_ywyryg.png', // Gatito 2 (blanco)
    'https://res.cloudinary.com/dlvpftdsm/image/upload/v1694119151/Frame_427319171_n4yrps.png' // Perrito fuego
  ]

  const { prevStep, addData, formData } = useSetupSteps()
  const [avatar, setAvatar] = useState(links[0])
  const [shownAvatars, setShownAvatars] = useState(links.slice(1, links.length))
  const { session } = useSession()
  const router = useRouter()

  const handleAvatar = (link: string) => {
    const filteredAvatars = shownAvatars.filter((avatar) => avatar !== link)
    setShownAvatars([...filteredAvatars, avatar])
    setAvatar(link)
  }

  const onNextStep = async () => {
    addData({ avatar })

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/home')
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <div className={style.data}>
        <Image className={style.data__back} onClick={prevStep} alt='back' src={'/images/arrow-back.svg'} width={40} height={40} />
        <h3>Tu avatar</h3>
        <small>5/5</small>
      </div>
      <div className={style.form}>
        <span className={style.avatar}>
          <p>Elige un avatar de tu preferencia</p>
          <div className={style.avatar__selected}>
            <Image src={avatar} alt='avatar' width={200} height={200} />
          </div>
          <div className={style.avatar__list}>
            {
              shownAvatars.map((link, index) => (
                <div key={index} onClick={() => handleAvatar(link)} className={style.avatar__item}>
                  <Image src={link} alt='avatar' width={100} height={100} />
                </div>
              ))}
          </div>
        </span>
        <button onClick={onNextStep} className={style.form__next}>Finalizar</button>
      </div>

    </>
  )
}

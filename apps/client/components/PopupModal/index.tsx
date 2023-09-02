import dynamic from 'next/dynamic'

const Modal = dynamic(() => import('components/PopupModal/Modal'), { ssr: false })

export function PopupModal ({ children }: {children: React.ReactNode}) {
  return (
    <Modal>
      {children}
    </Modal>
  )
}

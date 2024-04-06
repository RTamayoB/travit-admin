import React, {
  FC,
  useRef,
  useState,
  useEffect,
  TextareaHTMLAttributes,
} from 'react'
import './textArea.scss'
export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<TextAreaProps> = ({ ...props }) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [scrollHeight, setScrollhHeight] = useState('1rem')
  const [clientHeight, setClientHeight] = useState('1rem')
  const [clientWidth, setClientWidth] = useState('1rem')
  // scroll to top and resize to one line
  const handleBlur = () => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0 })
      ref.current.style.height = '1em'
    }
  }
  // set area height to actual scoll content
  const handleFocus = () => {
    if (ref.current) {
      ref.current.style.height = scrollHeight
    }
  }
  // event listener to get area scrollHeight
  const hanldeAreaSize = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    setScrollhHeight(`${target.scrollHeight}px`)
    // set area height also when writing
    if (ref.current) {
      ref.current.style.height = `${target.scrollHeight}px`
    }
  }
  useEffect(() => {
    // set height if theres a default value
    if (ref.current) {
      setScrollhHeight(`${ref.current.scrollHeight}px`)
      setClientHeight(`${ref.current.clientHeight}px`)
      setClientWidth(`${ref.current.clientWidth}px`)
    }
    // set the event listener
    ref.current?.addEventListener('scroll', hanldeAreaSize)
    return () => {
      ref.current?.removeEventListener('scroll', hanldeAreaSize)
    }
  }, [])

  return (
    <div className="msv-textArea">
      <div
        className="hiddenElement"
        style={{
          height: clientHeight,
          width: clientWidth,
        }}
      />
      <textarea
        ref={ref}
        onBlur={handleBlur}
        onFocus={handleFocus}
        {...props}
      />
    </div>
  )
}

TextArea.defaultProps = {}

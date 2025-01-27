"use client"

import {AnimatePresence, motion} from "framer-motion";
import {useRef} from "react"

interface Tipe {
    type: string,
    value: string
}

export default function Table({type, value}: Tipe) {
    const valueRef = useRef<HTMLSpanElement>(null);
    return (
        <motion.div
            initial={{y: -10, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{duration: 0.3, ease: "easeInOut"}}
            className="flex w-full border-b-2 rounded-l rounded-r" onClick={() => {
                if (valueRef.current) {
                    window.navigator.clipboard.writeText(valueRef.current.textContent || '')
                }
            }}>
            <span className="w-[30%] border-x-2 p-2 text-center">{type}</span>
            <span className="w-[70%] border-x-2 p-2 text-center cursor-pointer hover:bg-sky-900" ref={valueRef}>{value}</span>
        </motion.div>
    )
}

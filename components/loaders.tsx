import '@/style/loader.css'
import {AnimatePresence, motion} from 'framer-motion'

export default function Loader() {
    return (
        <div className='cursor-pointer' onClick={() => {

        }}>
            <span className='z-20 fixed bottom-[30px] right-[23px]'>Info</span>
            <div className="loader">
            </div>

            <AnimatePresence>
                <motion.div
                    className='fixed inset-x-32 rounded inset-y-10 bg-slate-700'>
                    <h1 className='text-center text-lg'>Credits</h1>
                    <span></span>
                </motion.div>
            </AnimatePresence>
        </div>



    )
}

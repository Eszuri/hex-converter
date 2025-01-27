"use client"

import {useEffect, useState} from "react";
import {AnimatePresence,motion} from "framer-motion";
import {Montserrat} from "next/font/google"
import Table from "@/components/table";
import {bytesToHex, floatToHex, hexToBytes, hexToFloat, isDecimal, isHexadecimal} from "@/utils/convertValue";
import {toast, Toaster} from "sonner";


const MontserratFont = Montserrat({
    weight: "600",
    subsets: ["latin"]
})

export default function Page() {

    const [options, setOptions] = useState<any>({type: null, method: null});
    const [inputValue, setInputValue] = useState('');
    const [resultValue, setResultValue] = useState({
        byte: '????????',
        twoBytes: '????????',
        fourBytes: '????????',
        float: '????????',
    });
    const [open, setOpen] = useState({
        byte: false,
        twoBytes: false,
        fourBytes: false,
        float: false
    });

    useEffect(() => {
        if (localStorage.getItem('type') == null || localStorage.getItem('method') == null) {
            localStorage.setItem("type", '0')
            localStorage.setItem("method", '0')
        }

    }, [])

    useEffect(() => {
        const storedType = Number(window.localStorage.getItem('type'));
        const storedMethod = Number(window.localStorage.getItem('method'));

        setOptions({type: storedType, method: storedMethod});
    }, []);


    function Convert() {

        function Looping(x: number) {
            let a = x - bytesToHex(inputValue).length;
            if (a < 0) {
                return a = 0;
            }
            return a;
        }

        function openCondition() {
            if (options.type == '1') {
                setOpen({...options, byte: true});
            } else if (options.type == '2') {
                setOpen({...options, twoBytes: true});
            } else if (options.type == '3') {
                setOpen({...options, fourBytes: true});
            } else if (options.type == '4') {
                setOpen({...options, float: true});
            } else {
                setOpen({byte: true, twoBytes: true, fourBytes: true, float: true});
            }
        }

        const classNameToastWarning = {className: "bg-yellow-500/90 text-white text-base"}

        if (inputValue == '') {
            toast.error('Input Masih Kosong', classNameToastWarning)
        } else if (options.type == '0' || options.method == '0') {
            toast.error('silahkan pilih type value dan convert mode', classNameToastWarning)
        } else if (options.method == '1' && isDecimal(inputValue) == false) {
            toast.error('value yg dimasukan bukan value decimal', classNameToastWarning)
        } else if (options.method == '2' && isHexadecimal('0x' + inputValue) == false) {
            toast.error('value yg dimasukan bukan value hexadecimal', classNameToastWarning)
        } else if (options.method == '1') {
            setResultValue({
                byte: '0'.repeat(Looping(2)) + bytesToHex(inputValue).slice(-2),
                twoBytes: '0'.repeat(Looping(4)) + bytesToHex(inputValue).slice(-4),
                fourBytes: '0'.repeat(Looping(8)) + bytesToHex(inputValue).slice(-8),
                float: floatToHex(inputValue) == "NaN" ? '????????' : floatToHex(inputValue)
            });
            openCondition();
        } else if (options.method == '2') {
            setResultValue({
                byte: String(hexToBytes(inputValue)),
                twoBytes: String(hexToBytes(inputValue)),
                fourBytes: String(hexToBytes(inputValue)),
                float: String(hexToFloat(inputValue)) == "NaN" ? '????????' : String(hexToFloat(inputValue))
            });
            openCondition();
        } else {
            alert('Error Tidak Diketahui')
        }
    }


    return (
        <main className={`w-[90%] mr-auto ml-auto pt-5 ${MontserratFont.className}`}>
            <Toaster duration={3500} position="top-right" visibleToasts={3} />
            <h1 className="text-center text-3xl pb-10">Hex Converter</h1>
            <div className="w-full text-center">
                <div className="inline relative">
                    <input type="text" className="text-white bg-zinc-700 p-2 rounded-2 outline-none rounded border-b-2 border-zinc-100/70 focus:border-b-blue-300 w-80 duration-300" placeholder="Masukan Value Disini" value={inputValue} onChange={(e) => {setInputValue(e.target.value)}} />
                    <motion.select
                        initial={{y: -30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.3}}
                        className="bg-zinc-700 p-[6px] w-32 absolute top-10 left-0 mb-2 rounded outline-none" value={options.type || 0} onChange={(e) => {
                            setOptions({...options, type: Number(e.target.value)});
                            localStorage.setItem('type', e.target.value as string);
                            setResultValue({byte: '????????', twoBytes: '????????', fourBytes: '????????', float: '????????'});
                            setOpen({byte: false, twoBytes: false, fourBytes: false, float: false});
                        }}>
                        <option value={'0'}>Select Type</option>
                        <option value={'1'}>Byte</option>
                        <option value={'2'}>2 Byte</option>
                        <option value={'3'}>4 Byte</option>
                        <option value={'4'}>Float</option>
                        <option value={'5'}>All Type</option>
                    </motion.select>
                    <motion.select
                        initial={{y: -30, opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        transition={{duration: 0.3}}
                        className="bg-zinc-700 p-[6px] w-44 absolute top-10 right-0 mb-2 rounded outline-none" value={options.method || 0} onChange={(e) => {
                            setOptions({...options, method: Number(e.target.value)});
                            localStorage.setItem('method', e.target.value as string);
                            setResultValue({byte: '????????', twoBytes: '????????', fourBytes: '????????', float: '????????'});
                            setOpen({byte: false, twoBytes: false, fourBytes: false, float: false});
                        }}>
                        <option value={'0'}>Convert To</option>
                        <option value={'1'}>Decimal To Hex</option>
                        <option value={'2'}>Hex To Decimal</option>
                    </motion.select>
                    <motion.button
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.3}}
                        className="absolute top-32 hover:bg-sky-700 left-1/2 translate-x-[-50%] bg-sky-600 p-2 rounded w-40" onClick={Convert}>Start Convert</motion.button>
                </div>
            </div>
            <div className="mt-44 w-full relative">

                <div className="grid w-80 absolute top-0 left-1/2 translate-x-[-50%]">
                    <div className="flex w-full bg-slate-800">
                        <span className="w-[30%] text-center border-2 rounded-l p-2 border-collapse">Type</span>
                        <span className="w-[70%] text-center border-2 rounded-r p-2 border-collapse">Value</span>
                    </div>
                    <AnimatePresence>
                        {open.byte && <motion.div key="table 1" exit={{opacity: 0, y: -10}}> <Table type="Byte" value={resultValue.byte} /> </motion.div>}
                        {open.twoBytes && <motion.div key="table 2" exit={{opacity: 0, y: -10}}> <Table type="2 Bytes" value={resultValue.twoBytes} /></motion.div>}
                        {open.fourBytes && <motion.div key="table 3" exit={{opacity: 0, y: -10}}> <Table type="4 Bytes" value={resultValue.fourBytes} /></motion.div>}
                        {open.float && <motion.div key="table 4" exit={{opacity: 0, y: -10}}> <Table type="Float" value={resultValue.float} /></motion.div>}
                    </AnimatePresence>
                </div>
            </div>

            { /*<Loader/> */}
            <span className="fixed bottom-1 right-2">Created By <span className="pl-2 tracking-wider font-bold text-lg text-emerald-500">LievaL</span></span>

        </main >
    );
}

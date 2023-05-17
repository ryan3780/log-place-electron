import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GMap from "../components/GMap";
import { useRouter } from "../hooks/useRouter";
import { LogCardElement } from "../types/LogCard";
import fs from 'fs'

const Detail = () => {

  const { id } = useParams();

  const [oneLog, setOneLog] = useState<LogCardElement | null>();

  const fetchDetailLog = () => {
    fs.readFile(`${__dirname}/data.json`, "utf8", (err, data) => {

      if (err) {
        console.log(err)
      } else {
        const log = JSON.parse(data).logs.filter((item: { id: number; }) => item.id === parseInt(id))
        setOneLog(log[0])
      }
    });
  }

  useEffect(() => {
    fetchDetailLog()
  }, []);


  const { routeTo } = useRouter()

  const updateLog = () => {
    routeTo(`/edit/${id}`, oneLog)
  }

  const deleteFile = async (id: number) => {

    fs.readFile(`${__dirname}/data.json`, "utf-8", function (err, data) {

      const deletedJson = JSON.parse(data).logs.filter((log: { id: number; }) => log.id != id)

      fs.writeFile(`${__dirname}/data.json`, JSON.stringify({ logs: deletedJson }), () => {
        if (err) {
          console.log(err)
        }
      })
    })
  }

  const DeleteLog = () => {

    deleteFile(parseInt(id)).then(() => {
      routeTo('/')
    });

  }


  return (

    <div>

      <div className="flex justify-center items-center">
        {oneLog &&
          <>
            <div className="flex flex-col">
              <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                <img className="w-[300px] h-[400px]" src={oneLog.imageUrl} alt="업로드 이미지" />
                <div className="mt-[20px] text-center">
                  {oneLog.oneLineComment}
                </div>
                <div className="mt-[20px] text-center">
                  {oneLog.date}
                </div>
              </div>
              <button onClick={updateLog} className="relative left-[25%] w-[182px] rounded-full px-5 py-2.5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Edit</span>
              </button>

            </div>
            <div className="flex flex-col">
              <div className="flex flex-col items-center w-[500px] h-[560px] pl-[40px] pt-[40px]">
                {oneLog && oneLog.lat && oneLog.longt ?
                  <GMap lat={parseFloat(oneLog.lat)} lng={parseFloat(oneLog.longt)} /> : <div className="relative top-[40%] text-center">  위치 정보가 없습니다. </div>}
              </div>
              <button onClick={DeleteLog} className="relative left-[35%] w-[182px] rounded-full px-5 py-2.5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-red-400 transition-all ease-out duration-300">
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span className="relative">Delete</span>
              </button>
            </div>
            <div>

            </div>
          </>
        }

      </div>
    </div>
  )

}

export default Detail;
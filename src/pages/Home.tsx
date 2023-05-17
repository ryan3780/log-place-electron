import { useEffect, useMemo, useState } from "react";
import LogCard from "../components/LogCard";
import { LogCardElement } from "../types/LogCard";
import fs from 'fs'


const Home = () => {

  const [allLogsData, setAllLogsData] = useState<LogCardElement[] | null>([]);

  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchLogs = async () => {

    fs.readFile(`${__dirname}/data.json`, "utf8", (err, data) => {

      if (err) {
        console.log(err)
      } else {

        setAllLogsData(JSON.parse(data).logs.sort((a, b) => b.id - a.id))
        setRefresh(true)
      }
    });

  }


  useEffect(() => {

    fetchLogs()

  }, [refresh])


  const divideColumn = (data: LogCardElement[]) => {

    const gridEnd = Math.ceil(data.length / 3)

    let firstColumn: LogCardElement[]
    let secondeColumn: LogCardElement[]
    let thirdColumn: LogCardElement[]

    if (data.length < 2) {
      firstColumn = [data[0]]
    } else if (data.length < 3) {
      firstColumn = [data[0]]
      secondeColumn = [data[1]]
    } else if (data.length < 4) {
      firstColumn = [data[0]]
      secondeColumn = [data[1]]
      thirdColumn = [data[2]]
    }
    else {

      firstColumn = [...data.slice(0, gridEnd)]
      secondeColumn = [...data.slice(gridEnd, gridEnd * 2)]
      thirdColumn = [...data.slice(gridEnd * 2)]

    }


    return { firstColumn, secondeColumn, thirdColumn }

  }


  return (
    <div className="flex justify-center items-center m-auto py-10 px-0">
      <div className="flex gap-5">
        <div className="flex flex-col gap-5">
          {allLogsData.length > 0 && divideColumn(allLogsData).firstColumn.map((log, idx) => {
            return (
              <LogCard key={idx} {...log} />
            )
          })}
        </div>
        <div className="flex flex-col gap-5">
          {allLogsData.length > 1 && divideColumn(allLogsData).secondeColumn.map((log, idx) => {
            return (
              <LogCard key={idx} {...log} />
            )
          })}
        </div>
        <div className="flex flex-col gap-5">
          {allLogsData.length > 2 && divideColumn(allLogsData).thirdColumn.map((log, idx) => {
            return (
              <LogCard key={idx} {...log} />
            )
          })}
        </div>
      </div>
    </div>
  )

}

export default Home;
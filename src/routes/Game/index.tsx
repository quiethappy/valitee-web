import { useCallback, useEffect, useState } from "react"
import { useParams } from "react-router"
import { getGameById } from "../../api"
import { disconnectInstance, getInstance } from "../../socket"
import { GameType, IGame } from "../../types"
import { userId} from '../../user'
import './index.css'


function Game() {
  const [game, setGame] = useState<IGame>()
  const params = useParams()
  const [result, setResult] = useState('')


  useEffect(() => {
    // 根据id获取游戏info
    if(!params.id) return 
    getGameById(Number(params.id)).then((res: any) => {
      console.log(res.data)
      const game = res.data
      if(!game) return

      if(game.status === 1) {
        setResult('游戏已经结束')
        return 
      }
      
      if(res.data?.members?.length >= 2) {
        setResult('人数超过两人')
      } else {
        setGame(res.data)
      }
    })
  }, [])

  return game ? <GameDetail /> : <div className="home">{result}</div>
}

function GameDetail() { 
  const [socket, setSocket] = useState(null)
  const params = useParams()
  const gameId = params.id ?? ''
  const [selected, setSelected] = useState<GameType>()
  const [result, setResult] = useState('')
  const [game, setGame] = useState<IGame>()

  useEffect(() => {
    const socket = getInstance()
    setSocket(socket)

    socket.emit('join', {gameId, userId})

    socket.on('selectMsg', async function (data: any) {
      setResult(data)
      getGameById(Number(params.id)).then((res: any) => {
        console.log(res.data)
        const game = res.data
        setGame(game)
      })
    })

    return () => {
      disconnectInstance()
    }
  }, [])

  const handleSelect = useCallback((type: GameType) => {
    if(game?.status === 1) {
      setResult('游戏已结束')
      return
    }
    setSelected(type)
    if(socket) {
      (socket as any).emit('select', {type, gameId, userId})
    }
  }, [gameId, socket, game])

  return <div className="home"> 
    <div className="button" style={{backgroundColor: selected === GameType.SHITOU ? 'lightblue' : ''}} onClick={() => {handleSelect(GameType.SHITOU)}}>石头</div>
    <div className="button" style={{backgroundColor: selected === GameType.JIANDAO ? 'lightblue' : ''}} onClick={() => {handleSelect(GameType.JIANDAO)}}>剪刀</div>
    <div className="button" style={{backgroundColor: selected === GameType.BU ? 'lightblue' : ''}}  onClick={() => {handleSelect(GameType.BU)}}>布</div>

    <div className="result">{typeof selected !== 'undefined' && !result ? '等待中...' : result}</div>

  </div>
}

export default Game
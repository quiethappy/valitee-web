import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import { addGame, getGameList } from "../../api"
import { IGame } from "../../types"
import './index.css'

function Home() {
  const [games, setGames] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    getGameList().then((res: any) => {
      setGames(res.data)
    })
  }, [])

  const handleCreate = async () => {
    // 创建游戏，获取游戏id
    const res = await addGame()
    // 跳转到游戏页面
    gotoGame(res.data)
  }

  const gotoGame = (id: number) => {
    navigate(`/game/${id}`)
  }

  return <div className="home"> 
    <div className="button" onClick={handleCreate}>创建新游戏</div>
    <div style={{marginBottom: '10px'}}>游戏列表: </div>
    <div>
      {
        games.map((game: IGame) => (
          <div className="list" key={game.id} onClick={() => {gotoGame(game.id)}}>
            游戏 - {game.id}
          </div>
        ))
      }
    </div>
  </div>
}

export default Home
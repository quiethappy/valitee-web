function request(url: string, options?: any) {
  return fetch(url, options).then(async (res: any) => {
    return res.json()
  })
}

export function getGameById(id: number) {
  return request(`/api/game/detail/${id}`)
}

export function getGameList() {
  return request('/api/game/list')
}

export function addGame() {
  return request('/api/game/create', {
    method: 'POST'
  })
}
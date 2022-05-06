// 使用枚举的方式对类型进行限制，主要是JavaScript不报错，万一是这里打错了，就比较难发现
// 使用枚举的方式对类型进行限制的话，出错的话能够提醒
enum play {
    O = "o",
    X = "x"
}
let winsArr = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // 横
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // 竖
    [0, 4, 8], [2, 4, 6]	            // 斜
]
let step = 0
let cell = document.querySelectorAll(".cell") //获取每个格子
let gameBord = document.querySelector('#bord') // 获取每个板子
// 获胜信息面板
let message = document.querySelector('#message') as HTMLDivElement
// 获胜者
let winner = document.querySelector('#winner') as HTMLParagraphElement
// 重新开始按钮
let restart = document.querySelector('#restart') as HTMLButtonElement
let currentPlayer: play = play.X
// 初始状态，给每个棋子都添加点击事件
cell.forEach((item, index) => {
    let cell = item as HTMLDivElement
    cell.addEventListener('click', clickCell, { once: true })
})
// 判断胜负的函数---这是我见过的最low的一种写法
function checkWin(play: play) {
    let iswin = winsArr.some((item, index) => {
        let cellIndex1 = item[0]
        let cellIndex2 = item[1]
        let cellIndex3 = item[2]

        let cell1 = cell[cellIndex1]
        let cell2 = cell[cellIndex2]
        let cell3 = cell[cellIndex3]
        // console.log(cellIndex1, cellIndex2, cellIndex3)
        // console.log(cell1, cell2, cell3)
        if (
            cell1.classList.contains(play) &&
            cell2.classList.contains(play) &&
            cell3.classList.contains(play)
        ) {
            return true
        }
        return false

    })
    return iswin
}
restart.addEventListener('click', function () {
    // 隐藏获胜信息
    message.style.display = 'none'
    // 重置下棋次数
    step = 0
    // 重置默认玩家为 x
    currentPlayer = play.X
    // 重置下棋提示为 x
    gameBord.classList.remove(play.X, play.O)
    gameBord.classList.add(play.X)
    cell.forEach(function (item) {
        let cell = item as HTMLDivElement
        // 清空棋盘
        cell.classList.remove(play.X, play.O)
        // 移除单元格点击事件、重新给单元格绑定点击事件
        cell.removeEventListener('click', clickCell)
        cell.addEventListener('click', clickCell, { once: true })
    })
})
// 每个按钮的点击事件
function clickCell(event: MouseEvent) {
    let target = event.target as HTMLDivElement
    target.classList.add(currentPlayer)
    // 记录下棋次数
    step++
    // 调用判赢函数判断是否获胜
    let isWin = checkWin(currentPlayer)
    if (isWin) {
        message.style.display = 'block'
        winner.innerText = currentPlayer + ' 赢了！'
        return
    }
    // 判断平局
    if (step === 9) {
        message.style.display = 'block'
        winner.innerText = '平局'
        return
    }
    // 根据当前玩家，得到另外一个玩家
    currentPlayer = currentPlayer === play.X ? play.O : play.X
    // 处理下一步提示
    gameBord.classList.remove(play.X, play.O)
    gameBord.classList.add(currentPlayer)
}

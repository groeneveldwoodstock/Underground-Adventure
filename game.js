//IMPORTANT: Make sure to use Kaboom version 0.5.0 for this game by adding the correct script tag in the HTML file.

kaboom({
  global: true,
  fullscreen: true,
  scale: 1,
  debug: true,
  clearColor: [0.75, 0.55, 0.35, 3],
})

// Speeds
const MOVE_SPEED = 120
const rock_SPEED = 100
const greenguy_SPEED = 60
function patrolbird(distance = 1, speed = 60, dir = -1) {
  return {
      id: "patrolbird",
      require: ["pos", "area",],
      startingPos: vec2(0, 0),
      add() {
      this.startingPos = this.pos;
      },
      update() {
      if (Math.abs(this.pos.x - this.startingPos.x) >= distance) {
          dir = -dir;
          if (dir>0){
            this.use(sprite('birdr'))
          }
          else{
              this.use(sprite('birdl'))
          }
      }
      this.move(speed * dir, 0);
      },
  };
  
}
function patrol(distance = 5, speed = 50, dir = 1) {
  return {
    id: "patrol",
    require: ["pos", "area",],
    startingPos: vec2(0, 0),
    add() {
      this.startingPos = this.pos;
      this.on("collide", (obj, side) => {
        if (side === "left" || side === "right") {
          dir = -dir;
        }
      });
    },
    update() {
      if (Math.abs(this.pos.x - this.startingPos.x) >= 5) {
        dir = -dir;
      }
      this.move(speed * dir, 0);
    },
  };
}
// Game Logic
loadRoot('zimages/')
loadSprite('going-left', 'beanl.png')
loadSprite('going-right', 'bean.png')
loadSprite('going-down', 'beanfront.png')
loadSprite('going-up', 'beanback.png')
loadSprite('ground', 'ground.png')
loadSprite('grass', 'grass.png')
loadSprite('door', 'door.png')
loadSprite('box', 'box.png')
loadSprite('lanterns', 'candles.png')
loadSprite('rock', 'rock.png')
loadSprite('greenguy', 'monster.png')
loadSprite('ogre', 'ogre.png')
loadSprite('kaboom', 'boom.png')
loadSprite('stairs', 'stairs.png')
loadSprite('gold', 'goldpot.png')
loadSprite('hole', 'hole.png')
loadSprite('plants', 'plants.png')
loadSprite('lake', 'lake.png')
loadSprite('apple', 'apple.png')
loadSprite('rubble', 'rubble.png')
loadSprite('rocks', 'rocks.png')
loadSprite('bottle', 'bottle.png')
loadSprite('barrel', 'barrel.png')
loadSprite('bridge', 'bridge.png')
loadSprite('bridgev', 'bridgev.png')
loadSprite('birdl', 'birdl.png')
loadSprite('birdr', 'birdr.png')
loadSprite('portal', 'portal.png')
loadSprite('virus', 'virus.png')
loadSprite('spike', 'spike.png')
loadSprite('coin', 'coin.png')
loadSprite('cloud', 'cloud.png')

scene('game', ({ level, score, keys, lives }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  const maps = [
    [//1
      'cccccccccccccccc',
      'a !   a    ~   a',
      'a *    *       a',
      'a  lll    aaa  a',
      ')   nn    h a  a',
      'a  lll    a a  a',
      'a   *  *  a a  a',
      'a         a    a',
      'aaaaaaaa  aa aaa',
      'a!     a   a   a',
      'aaa a!ha   a   a',
      'a   aaaa   a   a',
      'a aaa  a  aaa aa',
      'a a       h    a',
      'a hhh#ha  a +  a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//2
      'cccccccccccccccc',
      'a      ~  a  } a',
      'a  a   a  a    a',
      'a  a   a    }  a',
      ')  a } a  a    a',
      'a  a   a  a a  a',
      'a  a aaa  a a  a',
      'a         a@a  a',
      'aaaa aaa  aha  a',
      'a }    a  a    a',
      'a   a  a  a  } a',
      'a   a aa  a    a',
      'a } a     a a  a',
      'a      *    a aa',
      'a  ah    }    #a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//3
      'cccccccccccccccc',
      'a    !    a  ~ a',
      'a  a   a    a  a',
      ')  a } a  a a  a',
      'a  a   a  a a  a',
      'a  a aaa  a a  a',
      'a   !   s a a  a',
      'aaaa aaa  aha  a',
      'a    ! a  a    a',
      'a   s  a  a  } a',
      'a }    a  a    a',
      'a    !  } aha  a',
      'aaaa aaa  aha  a',
      'a^     a  a@   a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//4
      'cccccccccccccccc',
      'a         a  ~ a',
      'a  a   a    a  a',
      ')  a } a  a a  a',
      'a  a   a  a a  a',
      'a  a aaa  & a  a',
      'a       s & a  a',
      'aaaa aaa  aha  a',
      'ax     a  a    a',
      'a   s  a va  } a',
      'a      a  a    a',
      'a      a  a    a',
      'a         aha  a',
      'aaaa aaa  aha  a',
      'ax    $a  a@   a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//5
      'cccccccccccccccc',
      'a      m  a  ~ a',
      'a  a   }       a',
      ')  a v      a  a',
      'a  a      m a  a',
      'a  a &&&  & a  a',
      'a       s & a  a',
      'aaaa aaa  aha  a',
      'ax     a  a    a',
      'a   s  av a  v a',
      'a  xxx a  a    a',
      'a   s  a  a a  a',
      'ax     h  aha xa',
      'aaaahaaahaahaaaa',
      'ahhhhhh      h$a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//6
      'cccccccccccccccc',
      'all       !lllla',
      'al  *    *   lla',
      'a              a',
      ')              )',
      'allllll==lllllla',
      'allllll==lllllla',
      'allllll==lllllla',
      ')      hh   lll)',
      'a l           la',
      'a+ll           a',
      'allll     }    a',
      ')ll           l)',
      'ahh  *    &  h!a',
      '^hhh         lla',
      'aaaaaaaaaaaaaaaa',
    ],
    [//7
      'cccccccccccccccc',
      'a+  s    ll!+  ^',
      'a  ll s !    l a',
      'a   v  lll  m& a',
      ')           l& )',
      'a         lll& a',
      'a   lll    ll& a',
      'a        s   & a',
      ') ll   h    m& )',
      'a      l!l   & a',
      'a  l         & a',
      'a ll         & a',
      ') @ll    ll  & )',
      'alll         & a',
      'a      ll      a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//8
      'cccccccccccccccc',
      'a              a',
      'a &&&&&&&&&&&& a',
      'a       &    @xa',
      ') &&& & @ &&  &a',
      'a &x  &   &#&  a',
      'a &&& & &&&  & )',
      'a &x& &  x&@ & a',
      'a @    @&&   & a',
      'a &&&&&&&@ &&& a',
      'a   x&x        a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//9
      'cccccccccccccccc',
      'a !   a    ~   a',
      'a *    *       a',
      'a  lll    aaa==a',
      ')   nn    h a==a',
      'a  lll    a a  a',
      'a  *   *  a a  a',
      'a    s    a    a',
      'aaaaaaaa  aa aaa',
      'a!  s  a v a   a',
      'aaa a!ha   a v a',
      'a   aaaa v a   a',
      'a aaa ~a  aaa aa',
      'a a  !    h v  a',
      'a hhh#ha  a +  a',
      'aaaaaaaaaaaaaaaa',
    ],
    [//10
    '&&&&&&&&&&&&&&&&',
    '& s &l         &',
    '& &&&ls &&&&&& &',
    '&   &&  &+& && &',
    '& &   v h &    &',
    '&&&&    &m&&h&&&',
    '&# &&   &&&    &',
    '&   &&&&&   s  &',
    '&&         s!  &',
    'm&        sx   &',
    'm&       s!    &',
    'm&      sx     &',
    'm&     s!      &',
    '&&    sx       &',
    '&    s!        &',
    '&   sx     s   &',
    '&  s!       s  &',
    '& sx         s &',
    '&x!x rrrrrr x!x&',
    '&&&&&&&&&&&&&&&&',
    ],
    [//11
      'tttttttttttttttt',
      't   o   ~      t',
      'ccccccccccccc  c',
      'a  a   }  ~ a  a',
      ')  a v   r  av a',
      'a  a   *    a  a',
      'a  h &&&  & a  a',
      'a@     &  & a  a',
      'aaaa aaa  aha  a',
      'a x   r   a    a',
      'a v s  x  a  v a',
      'a  x    s a    a',
      'a   s  x  a    a',
      'a   s r  @aha  a',
      'aaaa (((((aha  a',
      'a@             a',
      'aaaaaaaaaaaaaaaa',
    ],
    [
      'cccccccccccccccc',
      'a    hha  ~    a',
      'a  * &         a',
      'a    h&     }  a',
      ')  h &         a',
      'a &    &    && a',
      'a &  } h    &  )',
      'a &    &&&&&&  a',
      'a     h       $a',
      'aaaaaaaaaaaaaaaa',
    ],
  ]
  const levelCfg = {
    width: 48,
    height: 48,
    a: [sprite('ground'), solid(), 'wall', 'object'],
    t: [sprite('cloud'), solid(), 'wall', 'object'],
    c: [sprite('grass'), solid(), 'wall', 'object'],
    ':': [sprite('rubble'), 'rubble'],
    '^': [sprite('door'), 'next-level', 'object'],
    '@': [sprite('portal'), 'previous-level', 'object'],
    $: [sprite('stairs'), 'next-level', 'object'],
    '*': [sprite('rock'), 'rock', { dir: -1 }, 'dangerous', 'object'],
    's': [sprite('spike'), 'rock', { dir: -1 }, 'dangerous', 'object'],
    '}': [sprite('greenguy'), 'dangerous', 'greenguy', 'object', { dir: -1, timer: 0 }],
    'v': [sprite('virus'), 'dangerous', 'greenguy', 'object', { dir: -1, timer: 0 }],
    'm': [sprite('ogre'), 'dangerous', 'ogre', 'object', { dir: -1, timer: 0 }],
    ')': [sprite('lanterns'), solid(), 'object'],
    'h': [sprite('barrel'), solid(),'barrel', 'object'],
    '(': [sprite('box'), solid(), 'object'],
    '&': [sprite('plants'), solid(), 'object'],
    '#': [sprite('hole'), 'hole'],
    '!': [sprite('gold'), 'item', 'object'],
    'x': [sprite('coin'), 'item', 'object'],
    '+': [sprite('apple'), 'bonus'],
    'l': [sprite('lake'), 'garden-level', 'object'],
    'o': [sprite('bottle'),'potion'],
    'r': [sprite('rocks'),'rubble', 'object'],
    'n': [sprite('bridge'),'rubble', 'object'],
    '=': [sprite('bridgev'),'rubble', 'object'],
    "~": [sprite('birdl'), 'bird', { dir: -1 }, 'dangerous', 'object'],
  }
  addLevel(maps[level], levelCfg)
  
  const livesLabel = add([
    text('Lives ' + lives),
    pos(800, 25),
    layer('ui'),
    {
      value: lives,
    },
    scale(2),
    color(0.3, 0.9, 0.5),
  ])
  const keyLabel = add([
    text('Gold ' + keys),
    pos(800, 100),
    layer('ui'),
    {
      value: keys,
    },
    scale(2),
  ])
  const scoreLabel = add([
    text('Score '+ score),
    pos(800, 75),
    layer('ui'),
    {
      value: score,
    },
    scale(2),
  ])
  const instructionsLabel = add([
    text("Use arrows or WASD\nto move.\nUse space bar to\nblow things up."),
    pos(800, 125),
    layer('ui'),
    scale(2),
    color(0.7, 0.7, 0.7),
  ])
  const announceLabel = add([
    text(announcement()),
    pos(800, 200),
    layer('ui'),
    scale(2),
    color(0.9, 0.3, 0.0),
  ])

  add([text('Level ' + parseInt(level + 1)), pos(800, 50), scale(2)])

  const player = add([
    sprite('going-right'),
    pos(50, 190),
    {
      // right by default
      dir: vec2(1, 0),
    },
  ])

  player.action(() => {
    player.resolve()
  })

  player.collides('next-level', () => {
    go('game', {
      level: findLevel(),
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })
  player.collides('previous-level', () => {
    go('game', {
      level: level-1,
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })

  player.overlaps('garden-level', () => {
    go('game', {
      level: maps.length-1,
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })
  player.overlaps('hole', () => {
    go('game', {
      level: findLevel(),
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })
  })
  
  keyDown('left', () => {
    player.changeSprite('going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })
  keyDown('a', () => {
    player.changeSprite('going-left')
    player.move(-MOVE_SPEED, 0)
    player.dir = vec2(-1, 0)
  })

  keyDown('right', () => {
    player.changeSprite('going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })
  keyDown('d', () => {
    player.changeSprite('going-right')
    player.move(MOVE_SPEED, 0)
    player.dir = vec2(1, 0)
  })

  keyDown('up', () => {
    player.changeSprite('going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })
  keyDown('w', () => {
    player.changeSprite('going-up')
    player.move(0, -MOVE_SPEED)
    player.dir = vec2(0, -1)
  })

  keyDown('down', () => {
    player.changeSprite('going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })
  keyDown('s', () => {
    player.changeSprite('going-down')
    player.move(0, MOVE_SPEED)
    player.dir = vec2(0, 1)
  })

  function spawnKaboom(p) {
    const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
    wait(1, () => {
      destroy(obj)
    })
  }
  function spawnRubble(p) {
    wait(1, () => {
      const obj = add([sprite('rubble'), pos(p), 'rubble'])
    })
  }
  function findLevel() {
    if (level < maps.length-1){
      return level + 1;
    }
    else{
      return 0;
    }
  }
  function announcement(){
    if (level == maps.length-1)
    {
      return "YOUR IN THE DUNGEON!\n\nYou must have died\nby getting too close\nto a monster,\nor gotten wet.\n\nThe stairs go back to level 1.\n\nYou don't lose a life\nunless you get too close\nto a monster.";  
    }
    else if(level == 0)
    {
      return "Don't get near\nthe stones\nor touch\nthe water.";
    }
    else if(level == 1)
  {
      return "Avoid these monsters\nor try and blow them up!";
    }
    else if(level == 2)
    {
      return "Collect the gold!\nWhen you can.";
    }
    else if(level == 4)
    {
      return "You can blow up\nthe barrels.";
    }
    else if(level == 5)
    {
      return "The apple means\nan extra life.";
    }
    else if(level == 6)
    {
      return "DON'T TOUCH\nTHE WATER";
    }
    else if(level == 7)
    {
      return "The portals\ntake you back\none level!";
    }
    else if(level == 8)
    {
      return "Find the potion\nto win the game!\n\nYou are getting close!";
    }
    else 
    {
      return "Time for Adventure!\n\nTHE SEARCH FOR\nTHE POTION";
    }
  }
  keyPress('space', () => {
    spawnKaboom(player.pos.add(player.dir.scale(48)))
  })
  
  collides('kaboom', 'greenguy', (k,s) => {
    camShake(4)
    wait(1, () => {
      destroy(k)
    })
    destroy(s)
     spawnRubble(player.pos.add(player.dir.scale(48)))
    scoreLabel.value++
    scoreLabel.text = 'score ' + scoreLabel.value
  })
  collides('kaboom', 'barrel', (k,b) => {
    wait(1, () => {
      destroy(k)
    })
    destroy(b)  
      spawnRubble(player.pos.add(player.dir.scale(48)))
  })
  collides('kaboom', 'bird', (k,b) => {
    wait(1, () => {
      destroy(k)
    })
    destroy(b)  
      spawnRubble(player.pos.add(player.dir.scale(48)))
  })

  action('rock', (s) => {
    s.move(s.dir * rock_SPEED, 0)
  })

  collides('rock', 'object', (s) => {
    s.dir = -s.dir
  })
  action('bird', (s) => {
    s.move(s.dir * 30, 0)
    if (s.dir>0){
      s.changeSprite('birdr')
    }
    else{
      s.changeSprite('birdl')
    }
  })
  collides('greenguy', 'object', (s) => {
    s.dir = -s.dir
  })
  
  

  action('greenguy', (s) => {
    s.move(0, s.dir * greenguy_SPEED)
    s.timer -= dt()
    if (s.timer <= 0) {
      s.dir = -s.dir
      s.timer = rand(5)
    }
  })

  collides('dangerous', 'wall', (d,w) => {
    d.dir *=-1
  })

  player.overlaps('dangerous', () => {
    livesLabel.value--
    livesLabel.text = 'Lives ' + livesLabel.value
    if (livesLabel.value < 0) {go('lose', { score: scoreLabel.value })}
    else{
      camShake(4)
      go('game', {
      level: maps.length-1,
      score: scoreLabel.value,
      keys: keyLabel.value,
      lives: livesLabel.value,
    })}
  })
  player.collides('item', (i) => {
    get('item')
    destroy(i)
    keyLabel.value++
    scoreLabel.value++
    scoreLabel.value++
    keyLabel.text = 'Gold ' + keyLabel.value
    scoreLabel.text = 'Score ' + scoreLabel.value
  })
  player.overlaps('potion', (i) => {
    go('win', { score: scoreLabel.value })
    destroy(i)
  })
  player.collides('bonus', (b) => {
    get('bonus')
    destroy(b)
    livesLabel.value++
    livesLabel.text = 'Lives ' + livesLabel.value
    announceLabel.text = 'You earned another life!'
  })
  
})

scene('lose', ({ score, keys }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([text('Game Over\nScore: ' + score, 28), origin('center'), pos(width() / 2, 100)])
  keyPress('n', () => {
    window.location.reload();
  })
  add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);
  add([
		text("Play Again"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);
  action("button", b => {

		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}

		if (b.isClicked()) {
			b.clickAction();
		}
	});
})

scene('win', ({ score, keys }) => {
  layers(['bg', 'obj', 'ui'], 'obj')
  add([text('Great Work Adventurer!\nScore: ' + score, 28), origin('center'), pos(width() / 2, 100)])
  keyPress('n', () => {
    window.location.reload();
  })
  add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);
  add([
		text("Play Again"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);
  action("button", b => {
		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}
		if (b.isClicked()) {
			b.clickAction();
		}
	});
})

scene("menu", () => {
	add([
		text("Underground Adventure\nBy Mr. Groeneveld\nPope HS\nComputer Science"), origin('center'),
		pos(width()/2, 60),
		scale(3),
	]);
	add([
		rect(160, 40),origin('center'),
		pos(width()/2, 180),
		"button",
		{
			clickAction: () => go('game', { level: 0, score: 0 , keys:0, lives:3}),
		},
	]);
	add([
		text("Play game"),origin('center'),
		pos(width()/2, 180),
    scale(2),
		color(0, 255, 0)
	]);
	add([
		rect(255, 40),origin('center'),
		pos(width()/2, 240),
		"button",
		{
			clickAction: () => window.open('https://kaboomjs.com/', '_blank'),
		},
	]);
	add([
		text("Learn Kaboom.js"),origin('center'),
		pos(width()/2, 240),
    scale(2),
		color(0, 0, 255)
	]);
  add([
    rect(430, 40),origin('center'),
    pos(width()/2, 300),
    "button",
    {
      clickAction: () => window.open('https://replit.com/@RichardGroeneve/Zelda-Kaboom#game.js', '_blank'),
    },
	]);
	add([
		text("Starter Code For This Game"),origin('center'),
		pos(width()/2, 300),
    scale(2),
		color(255, 255, 0)
	]);
	action("button", b => {

		if (b.isHovered()) {
			b.use(color(0.7, 0.7, 0.7));
		} else {
			b.use(color(255, 0, 0));
		}
		if (b.isClicked()) {
			b.clickAction();
		}
	});
});

start("menu")
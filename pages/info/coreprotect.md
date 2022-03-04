# CoreProtect Basics

Perform a lookup. Nearly all of the parameters are optional.
Command 	Parameters
/co lookup 	u:<user> t:<time> r:<radius> a:<action> i:<include> e:<exclude>
/co l 	/co lookup <params>
  **Parameters**

+-----------+-------------------------------------------------+
| Parameter | Description                                     |
+-----------+-------------------------------------------------+
| `u:`      | Specify the user(s) to lookup.                  |
+-----------+-------------------------------------------------+
| `t:`      | Specify the amount of time to lookup.           |
+-----------+-------------------------------------------------+
| `r:`      | Specify a radius area to limit the lookup to.   |
+-----------+-------------------------------------------------+
| `a:`      | Restrict the lookup to a certain action.        |
+-----------+-------------------------------------------------+
| `i:`      | Include specific blocks/entities in the lookup. |
+-----------+-------------------------------------------------+
| `e:`      | Exclude blocks/entities from the lookup.        |
+-----------+-------------------------------------------------+
| `#`       | Add a hashtag to perform additional actions.    |
+-----------+-------------------------------------------------+

  **Pagination**

If multiple pages are returned, use the command /co lookup <page> to switch pages.
To change the number of lines displayed on a page, use /co lookup <page>:<lines>.

    For example, /co l 1:10 will return 10 lines of data, starting at the first page.

	**/co rollback**

Perform a rollback. Uses the same parameters as /co lookup.
Rollbacks can be used to revert player actions.
Command 	Parameters
/co rollback 	u:<user> t:<time> r:<radius> a:<action> i:<include> e:<exclude>
/co rb 	/co rollback <params>



`u:<user>`

You can specify a single user or multiple users.

    **Example:** `u:Notch`
    **Example:** `u:Notch,Intelli`

`t:<time>`

You can specify weeks, days, hours, minutes, and seconds.
Time amounts can be combined, and decimals may be used.

    **Example:** `t:2w,5d,7h,2m,10s`
    **Example:** `t:5d2h`
    **Example:** `t:2.50h` *(2 and a half hours)*

`r:<radius>`

A numeric radius targets within that many blocks of your player location.

    **Example:** `r:10` *(target within 10 blocks of your location)*
    **Example:** `r:#world_the_end` *(target a specific world)*
    **Example:** `r:#global` *(target the entire server)*
    **Example:** `r:#worldedit` *or r:#we (target a WorldEdit selection)*

`a:<action>`

Restrict the command to a specific action

    **Example:** `a:+block` *(only include placed blocks)*


	**Actions**

+----------------+--------------------------------------------------------------+
| Action         | Description                                                  |
+----------------+--------------------------------------------------------------+
| `a:block`      | blocks placed/broken                                         |
+----------------+--------------------------------------------------------------+
| `a:+block`     | blocks placed                                                |
+----------------+--------------------------------------------------------------+
| `a:-block`     | blocks broken                                                |
+----------------+--------------------------------------------------------------+
| `a:chat`       | messages sent in chat                                        |
+----------------+--------------------------------------------------------------+
| `a:click`      | player interactions                                          |
+----------------+--------------------------------------------------------------+
| `a:command`    | commands used                                                |
+----------------+--------------------------------------------------------------+
| `a:container`  | items taken from or put in chests                            |
+----------------+--------------------------------------------------------------+
| `a:+container` | items put in chests                                          |
+----------------+--------------------------------------------------------------+
| `a:-container` | items taken from chests                                      |
+----------------+--------------------------------------------------------------+
| `a:inventory`  | items dropped, picked up, deposited, or withdrawn by         |
|                |  players                                                     |
+----------------+--------------------------------------------------------------+
| `a:+inventory` | items picked up or withdrawn by players                      |
+----------------+--------------------------------------------------------------+
| `a:-inventory` | items dropped or deposited by players                        |
+----------------+--------------------------------------------------------------+
| `a:item`       | merges a:container and a:inventory                           |
+----------------+--------------------------------------------------------------+
| `a:+item`      | merges a:+container and a:+inventory                         |
+----------------+--------------------------------------------------------------+
| `a:-item`      | merges a:-container and a:-inventory                         |
+----------------+--------------------------------------------------------------+
| `a:kill`       | mobs/animals killed                                          |
+----------------+--------------------------------------------------------------+
| `a:session`    | player logins/logouts                                        |
+----------------+--------------------------------------------------------------+
| `a:+session`   | player logins                                                |
+----------------+--------------------------------------------------------------+
| `a:-session`   | player logouts                                               |
+----------------+--------------------------------------------------------------+
| `a:sign`       | messages written on signs                                    |
+----------------+--------------------------------------------------------------+
| `a:username`   | username changes                                             |
+----------------+--------------------------------------------------------------+

i:<include>

Can be used to specify a block/item/entity.

    **Example:** `i:stone` *(only include stone)*
    **Example:** `i:stone,oak_wood,bedrock` *(specify multiple blocks)*

    You can find a list of block names at https://coreprotect.net/wiki-blocks.
    You can find a list of entity names at https://coreprotect.net/wiki-entities.

`e:<exclude>`

Can be used to exclude a block/item/entity/user.

    **Example:** `e:tnt` *(exclude TNT)*

`#<hashtag>`

Add a hashtag to the end of your command to perform additional actions.

    Example: #preview (perform a rollback preview)

  **Hashtags**

+----------+----------------------------------------------------------+
| Hashtag  | Effect                                                   |
+----------+----------------------------------------------------------+
| #preview | Preview a rollback/restore                               |
+----------+----------------------------------------------------------+
| #count   | Return the number of rows found in a lookup query        |
+----------+----------------------------------------------------------+
| #verbose | Display additional information during a                  |
|                    | rollback/restore                               |
+----------+----------------------------------------------------------+
| #silent  | Display minimal information during a                     |
|                | rollback/restore                                   |
+----------+----------------------------------------------------------+

	**Example Commands**

  **Example Rollback Commands**

By default, if no radius is specified, a radius of 10 will be applied, restricting the rollback to within 10 blocks of you. Use r:#global to do a global rollback.

    `/co rollback Notch t:1h`
    *(rollback Notch 1 hour (with default radius of 10))*
    `/co rollback u:Notch,Intelli t:1h #preview`
    *(PREVIEW rolling back both Notch & Intelli 1 hour (with default radius of 10))*
    `/co rollback u:Notch t:23h17m`
    *(rollback Notch 23 hours and 17 minutes (with default radius of 10))*
    `/co rollback u:Notch t:1h i:stone`
    *(rollback ONLY stone placed/broken by Notch within the last hour (with default radius of 10))*
    `/co rollback u:Notch t:1h i:stone a:-block`
    *(rollback ONLY stone BROKEN by Notch within the last hour (with default radius of 10))*
    `/co rollback u:Notch t:1h r:#global e:stone,dirt`
    *(rollback EVERYTHING Notch did in the last hour EXCEPT for stone and dirt placed/broken)*
    `/co rollback u:Notch t:1h r:20`
    *(rollback griefing Notch did in the last hour that is within 20 blocks of you)*
    `/co rollback u:Notch t:1h r:#nether`
    *(rollback griefing Notch did in the last hour ONLY in the Nether)*
    `/co rollback t:15m r:30`
    *(rollback everything done in the last 15 minutes by anyone within 30 blocks of you)*
    `/co rollback t:15m r:#worldedit`
    *(rollback everything done in the last 15 minutes in a WorldEdit selection)*

Example Lookup Commands

Lookup commands are generally the same as rollback commands. The primary difference is that a default radius is
not applied to lookups, meaning all lookup commands do a global search by default.

    `/co lookup i:diamond_ore t:1h a:-block`
    *(lookup all diamond ore mined in the last hour)*
    `/co lookup u:Notch t:30m a:chat`
    *(lookup chat messages sent by Notch in the last 30 minutes)*
    `/co lookup u:Notch a:login`
    *(lookup all logins ever done by Notch)*
    `/co lookup u:Notch a:login`
    *(lookup all logins ever done by Notch)*
    `/co lookup u:Notch a:username`
    *(lookup previous usernames used by Notch)*

***IMPORTANT***
When doing a rollback, generally using the #preview tag first is a good idea. This performs a rollback only you can 
see, so if you accidentally miss a parameter you can correct it before doing the actual rollback.

***NEVER*** do a rollback without adding radius *or* time to it, and avoid doing rollbacks in places with high mob 
density, as there is no cap to how many mobs can be put in one area, and nothing will stop coreprotect from putting
an absurd amount of mobs in an area. *If* you accidentally perform a rollback that was unintentional, put it in staff 
chat and ping either Tristan or fadingly. Rollbacks can be undone with the /co restore command, however only Tristan 
is allowed to perform this command. All coreprotect commands are logged in a channel, so undoing an accidental rollback is easy.
  
Coreprotect is a *block logging plugin*. This means it only logs changes to physical blocks in the world, and non player entities.
It can only perform rollbacks on these things it logs. As a result, any changes to players or dropped items on the ground *cannot 
be rolled back*. If somebody dies to a mob, this cannot be undone using coreprotect. If items dropped on the ground are destroyed
*in any way* **this cannot be undone**.

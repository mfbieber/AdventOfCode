import {Track} from "./Day13";

let trackInput : string =
    '/------------------------------------\\                   /----------------------------------------------------------------------------------\\         \n' +
    '|                                    |                   |                                   /----------------------------------------------+\\        \n' +
    '|                                    |                   |                                   |            /--------------\\                  ||        \n' +
    '|                                    |             /-----+------------------\\                |            |              |                  ||        \n' +
    '|              /---------------------+-------------+-----+------------------+------------\\   |            |              |                  ||        \n' +
    '|              |                     |             |     |                  |            |   |/-----------+--------------+------------------++\\       \n' +
    '|              |    /------------\\   |             |     |                  |            |   ||           |              |                  |||       \n' +
    '| /------------+----+------------+---+-------------+----\\|                  |     /------+---++-----------+-------\\      |                  |||       \n' +
    '| |            |    |      /-----+---+-------------+----++------------------+-----+------+---++-----------+-------+------+-------\\          |||       \n' +
    '| |            |    |      |     |   |             |    ||                  |     |      |   ||   /-------+-------+------+--\\    |      /---+++---\\   \n' +
    '| |            |    |      |     |   |             |    ||                  |     |     /+---++---+-------+--\\    |      |  |    |      |   |||   |   \n' +
    '| |            |    |      |     |   |             |    ||   /--------------+-----+-----++---++---+-------+--+-\\  |      |  |    |      |   |||   |   \n' +
    '| |/-----------+----+------+-----+---+-------------+----++---+----------\\   |     |     ||   ||   |       |  | |  |      |  |/---+------+---+++---+-\\ \n' +
    '| ||          /+----+------+-----+---+-------------+----++---+----------+---+-----+-----++---++---+-------+--+-+-\\|      |  ||   |      |   |||   | ^ \n' +
    '| ||          ||    |      |     |  /+-------------+----++---+----------+--\\|     |     ||   ||   |       |  | | ||/-----+--++---+------+-\\ |||   | | \n' +
    '| ||          ||  /-+---->-+-----+--++-------------+----++---+----------+--++-----+-----++---++---+-------+--+-+-+++\\    |  ||   |      | | |||   | | \n' +
    '| ||          ||  | |      |   /-+--++--\\          |    ||   |         /+--++-----+-----++\\  ||   |       |  | | ||||    |  ||   |      | | |||   | | \n' +
    '| ||          ||  | |     /+---+-+--++--+----------+----++---+---------++--++-----+-----+++--++---+-------+--+-+-++++---\\|  ||   |      | | |||   | | \n' +
    '| ||          ||  | |     || /-+-+--++--+----\\     |    ||   |         ||  ||     |     |||  \\+---+-------+--+-+-++++---++--++---+------+-+-+/|   | | \n' +
    '| ||          ||  | |     |\\-+-+-+--++--+----+->---+----++---+---------++--++-----+-----+++---+---+-------+--+-+-++++---++--++---/      | | | |   | | \n' +
    '| ||          ||  | |     |  | | |  ||  |    |     \\----++---+---------++--+/     |     |||   |   |       |  | | ||||   ||  ||          | | | |   | | \n' +
    '| ||          ||  | |     |  | | |  ||  |  /-+----------++---+-\\       ||  |      |     |||   |   |       |  | | ||||   ||  ||          | | | |   | | \n' +
    '| ||          ||  | |     |  | | |  ||  |  | |          ||   | |       || /+------+---\\ |||   |   |       |  | | ||||   ||  ||          | | | |   | | \n' +
    '| ||          ||  | |     |  | | |  ||  |  | |          ||   | |       || ||      |   | |||   \\---+-------+--+-+-++++---++--++----------+-+-+-/   | | \n' +
    '| ||          ||  | |     |  | | |/-++--+--+-+----------++\\  | |       || || /----+---+-+++-------+-------+--+-+-++++---++--++---------\\| | |     | | \n' +
    '|/++----------++--+-+-----+--+-+-++-++--+--+-+----------+++--+-+-------++-++-+----+---+-+++-------+------\\|  | | ||||   ||  ||         || | |     | | \n' +
    '||||          |\\--+-+-----+--+-+-++-++--+--+-+----------+++--+-+-------++-++-+----+---+-+/|       |      ||  | | ||||   ||  ||         || | |     | | \n' +
    '||||          |   | |  /--+--+-+-++-++--+--+-+----------+++--+-+-------++-++-+----+---+-+-+-------+------++--+-+\\||||   ||  ||         || | |     | | \n' +
    '||||   /------+---+-+--+--+--+-+-++-++--+--+-+----------+++--+-+-------++-++-+----+---+-+-+-\\     |      ||  | ||||||   ||  ||         || | |     | | \n' +
    '||||   |      |   | |  |  |  | | ||/++--+--+-+----------+++--+-+\\ /----++-++-+----+---+-+-+-+-----+---\\  ||  | ||||||   ||  ||         || | |     | | \n' +
    '||||   |      |   | |  |  |  | | |||||  |  |/+----------+++--+-++-+--\\ || || |    |   | | | |     |   |  |\\--+-++++++---+/  ||         || | |     | | \n' +
    '||||   |      |   | |  |  |  | \\-+++++--/  |||          ||| /+-++-+--+-++-++-+----+---+-+-+-+-----+---+--+---+-++++++---+---++-\\       || | |     | | \n' +
    '||||   |      |   | |  |  |  |   |||||     |||          ||| || || | /+-++-++-+----+---+-+-+-+\\    |   |  |   | ||||||   |   || |       || | |     | | \n' +
    '||||   |      |   | |  |  |  |   |\\+++-----+++----------++/ || || | || || || \\----+---+-+-+-++----+---+--+---+-++++++---+---++-+-------/| | |     | | \n' +
    '||||   |      |   | |  |  |  |   | |||     |||        /-++--++-++-+-++-++-++------+---+-+-+-++----+---+--+---+-++++++---+---++-+--\\     | | |     | | \n' +
    '||||   |      |   | |  |  |  |   | |||/----+++--------+-++--++-++-+-++-++-++------+---+-+-+-++----+---+--+--\\| ||||||   |   || |  |     | | |     | | \n' +
    '\\+++---+------+---+-+--+--+--+---+-++/|    |||        | ||  || ||/+-++-++-++------+---+-+-+-++----+---+-\\|  || ||||||   |   || |  |     | | |     | | \n' +
    ' ||| /-+------+---+-+--+--+--+---+-++-+----+++--\\     | ||  || |||| || || ||      |   | | | ||    |   | ||  || ||||||   |   || |  |     | | |     | | \n' +
    ' ||| v |      |   | |  |  |  |   | || |/---+++--+-\\   | ||  || |||| || || ||      |/--+-+-+-++----+---+-++--++-++++++---+---++-+--+-----+-+-+--\\  | | \n' +
    ' ||| | |   /--+---+-+--+--+--+---+-++-++---+++--+-+---+-++--++-++++-++-++-++------++--+-+-+-++----+---+-++--++-++++++--\\|   || |  |     | | |  |  | | \n' +
    ' ||| | |   |  |   | |  |  |  |   | || ||/--+++--+-+---+-++--++-++++-++-++-++------++--+-+-+-++----+---+-++--++\\||||||  ||   || |  |     | | |  |  | | \n' +
    ' ||| | |   |/-+---+-+--+--+-\\|   | || |||  |||  | |   | ||  || ||||/++-++-++------++--+-+-+-++----+---+-++--+++++++++--++---++-+--+---\\ | | |  |  | | \n' +
    ' ||| | |   || |   | |  \\--+-++---+-++-+++--+++--+-+---+-++--++-+++++++-++-++------++--+-+-+-++----+---+-++--++++/||||  ||   || |  |   | | | |  |  | | \n' +
    ' ||| | |   || |   | |     | ||   | || |||/-+++--+-+---+-++--++-+++++++-++-++------++--+-+-+-++----+---+-++--++++-++++--++-\\ || |  |   | | | |  |  | | \n' +
    ' ||| | |   || |   | |     | ||   | || |||| |||  | |   | ||  || ||||||| || ||      ||  | | | ||    |   | ||  |||| ||||  || | || |  |   | | | |  |  | | \n' +
    ' ||| |/+---++-+---+-+----\\| ||   | || |||| |||  | |  /+-++--++-+++++++-++-++--\\   ||  | | | ||    \\---+-++--++++-++++--++-+-/| |  |   | | | |  |  | | \n' +
    ' ||| |||   || |   | |    || ||   | || |||| |||  | |  || ||  || ||||||| || ||  |   ||  | | | ||        | ||  |||| ||||  || |  | |  |   | | | |  |  | | \n' +
    ' \\++-+++>--++-+---+-+----++-++---+-++-++++-+++--+-+--++-++--++-+++++++-++-++--+---++--+-+-+-++--------+-+/  |||| ||||  || |  | |  |   | | | |  |  | | \n' +
    '  || |||   || | /-+-+----++-++---+-++-++++-+++--+-+--++-++-\\|| ||||||| || ||  |   ||  | | | ||        | |   |||| ||||  || |  | |  |   | | | |  |  | | \n' +
    '  || |||   || | | | |    || ||   | || |||| \\++--+-+--++-++-+++-/|||||| || ||  |   ||  | | | ||        | |   |||| ||||  || |  | |  |   | | | |  |  | | \n' +
    '  || |||   || |/+-+-+----++-++-\\ | || ||||  ||  | |  || || |||  ||||\\+-++-++--+---++--+-+-+-+/        | |   |||| ||||  || |  | |  |   | | | |  |  | | \n' +
    '  || |||   || ||| | |    || ||/+-+-++-++++--++--+-+--++-++-+++--++++-+-++-++--+---++--+-+-+-+---------+-+---++++-++++--++-+--+\\|  |   | | | |  |  | | \n' +
    '  || |||   || ||| | |    || |||| | || ||||  || /+-+--++-++-+++--++++-+-++-++--+---++--+-+-+-+---------+-+---++++-++++--++\\|  \\++--+---+-+-+-+--+--+-/ \n' +
    '  || |||   || ||| | | /--++-++++\\| || ||||  ||/++-+--++\\|| |||  |||| | || ||  |   ||  | | | |  /------+-+---++++-++++--++++\\  ||  |   | | | |  |  |   \n' +
    '  || |||   || |||/+-+-+--++-++++++-++-++++--+++++-+--+++++-+++--++++-+-++-++--+---++--+\\| | |  |      | |   |||| ||||  |||||/-++--+---+-+-+-+\\ |  |   \n' +
    '  |\\-+++---++-+++++-+-+--++-++++++-++-++++--+++++-+--+++++-+++--++++-+-+/ ||  |   ||  ||| | |  |      | |   |||| ||||  |||||| ||  |   | | | || |  |   \n' +
    '  |  |||   || ||||| | |  || |||||| || ||||  ||||| |  ||||| |\\+--++++-+-+--++--+---++--+++-+-+--+------+-+---++++-++++--++++++-+/  |   | | | || |  |   \n' +
    '  |  |||   || ||||| | |  || |||||| || ||||  ||||| |  |\\+++-+-+--++++-+-+--++--+---++--+++-+-+--+------+-+---++++-++++--++++++-+---/   | | | || |  |   \n' +
    '  \\--+++---++-+++++-+-+--++-++++++-++-++++--+++++-+--+-+/| | |  |||| | |  ||  |/--++--+++-+-+--+------+-+---++++-++++--++++++-+--\\    | | | || |  |   \n' +
    '     |||   || ||||| | |  || |||||| || ||||  ||||| |  | | | | |  |||| | |  ||  || /++--+++-+-+--+--\\   | |   |||| ||||  |||||| |  |    | | | || |  |   \n' +
    '     |||   || ||||| | |  || |||||| || |||\\--+++++-+--+-+-+-+-+--++++-+-+--++--++-+++--+++-+-+--+--+---+-+---++++-++++--+++/|| |  |    | | | || |  |   \n' +
    '     |||   || ||||| | |  || ||||||/++-+++---+++++-+--+\\| | | |  |||\\-+-+--++--++-+++--+++-+-+--+--+---+-+---++++-++++--+++-++-+--+----/ | | || |  |   \n' +
    '     |||  /++-+++++-+-+--++-+++++++++-+++---+++++-+-\\||| | | |  |||  |/+--++--++-+++--+++-+-+--+--+---+-+-\\ |||| ||||  ||| || |  |      | | || |  |   \n' +
    '    /+++--+++-+++++-+-+--++-+++++++++-+++--\\||||| | |||| | | | /+++--+++--++--++-+++--+++-+-+--+--+---+-+-+-++++-++++--+++-++-+-\\|      \\-+-++-+--/   \n' +
    '    ||||  ||| ||||| | |  || ||||||||| |||  |||||| | |||| \\-+-+-++++--+++--++--++-+++--+++-+-+--+--+---+-+-+-++++-++++->+++-++-+-++--------+-/| |      \n' +
    '    ||||  ||| ||||| | |  || ||||||||| |||  |||||| | ||||   | | ||||  |||  ||  || |||  ||| | |/-+--+---+-+-+-++++-++++--+++-++-+-++--------+--+-+--\\   \n' +
    '    ||||  ||| ||||| | |  || ||||||||| |||  |||||| | ||||   | | |||\\--+++--++--++-+++--+++-+-++-+--+---/ | | |||| ||||  ||| || | ||        |  | |  |   \n' +
    '    ||||  ||| ||||| | |  || ||||||||^ |||  |||||| | ||||   |/+-+++---+++--++--++-+++--+++-+-++-+--+-----+-+-++++-++++--+++-++-+-++--------+--+-+--+-\\ \n' +
    '    ||||  ||| ||||| | |  || ||||||||| |||  |||||| | ||||   ||| |||   |||  ||  || |v| /+++-+-++-+--+-----+-+-++++-++++--+++-++-+-++--\\     |  | |  | | \n' +
    '    ||||  ||| ||||| | |  ||/+++++++++-+++--++++++\\| ||||   ||| |||   |||  ||  || ||| |||| | || |  |     | | |||| ||||  ||| || | ||  |     |  | |  | | \n' +
    '    ||||  ||| ||||| | |  |||||||||||| ||| /++++++++-++++---+++-+++---+++--++--++-+++-++++-+-++-+--+-----+-+-++++-++++--+++-++-+-++--+-----+--+-+--+\\| \n' +
    '    ||||  ||| ||||| | |  |||||||||||| ||| ||||||||| ||||   ||| |||   |||  ||  || ||| |||| | || |  |     | | |||| ||||  ||| || | ||  |     |  | |  ||| \n' +
    '    ||||  ||| ||||| |/+--++++++++++++-+++-+++++++++-++++-\\/+++-+++---+++--++--++-+++-++++-+-++-+--+-----+-+-++++-++++--+++-++-+>++-\\|     |  | |  ||| \n' +
    '    ||||  ||| ||||| |||  |\\++++++++++-+++-+++++++++-++++-+++++-+++---+++--++--++-+++-++++-+-++-+--+-----+-+-++++-++++--+/| || | || ||     |  | |  ||| \n' +
    '    ||||  ||| ||||| ||\\--+-+++++/|||| ||| ||||||||| |||| ||||| |||   |||  ||  || ||| |||| | || |  |     | | |||| ||\\+--+-+-++-+-++-++-----/  | |  ||| \n' +
    '    ||||  ||| ||\\++-++---+-+++++-++++-+++-+++++++++-++++-++/|| |||   |||  ||  || ||| |||| | || |  |     | | |||| || |  | | || | || ||        | |  ||| \n' +
    '    ||||  ||| || || ||   | ||||| |||\\-+++-+++++++++-++++-++-++-+++---+++--+/  ||/+++-++++-+-++-+--+-----+-+-++++-++-+--+-+-++-+-++-++-\\      | |  ||| \n' +
    '    ||||  ||| || || ||   | ||||| |||  ||| ||||||||| |||| || || |||   |||  |   |||||| |||| | || |  |     |/+-++++-++-+--+-+-++-+-++-++-+------+-+\\ ||| \n' +
    '    ||||  ||| || |\\-++---+-+++++-+++--+++-+++++++++-++++-++-++-+++---+++--+---++++++-++++-+-++-+--+-----+++-++++-++-/  | | || | || || |      | || ||| \n' +
    ' /--++++--+++-++-+--++---+-+++++-+++--+++-+++++++++-++++-++-++-+++---+++--+---++++++-++++-+-++-+--+--\\  ||| |||| ||    | | || | || || |      | || ||| \n' +
    ' |  ||||/-+++-++-+--++---+-+++++-+++--+++-+++++++++-++++-++-++-+++---+++--+--\\|||||| \\+++-+-++-+--+--+--+++-++++-++----+-+-++-+-++-+/ |      | || ||| \n' +
    ' |  ||||| ||| || |  ||   | ||||| |||  ||| ||||||||| |||| || || |||   |||  |  |||||||  ||\\-+-++-+--+--+--+++-+/|| ||    | | || | || |  |      | || ||| \n' +
    ' |  |\\+++-+++-++-+--++---+-+++++-+++--+++-++++++/|| |||| || |\\-+++---+++--+--+++++++--++--+-++-+--+--+--+++-+-+/ ||    | | || | || |  |      | || ||| \n' +
    ' |  | ||| ||| || |  ||   | ||||| |||  ||| ||\\+++-++-++++-++-+--+++---/||  |  |||||||  ||  | || |  |  |  ||| | |  ||    | | || | || |  |      | || ||| \n' +
    ' |/-+-+++-+++-++-+--++---+-+++++\\|||  ||| \\+-+++-++-++++-++-+--+++----++--+--+++++++--++--+-++-+--+--+--+++-+-+--++----+-+-++-+-++-+->+------+-++-+/| \n' +
    ' || | ||| ||| || |  ||   | |||||||||  |||  | ||| || |||| || |  ||\\----++--+--+++++++--++--+-++-+--+--+--/|| | |  ||    | | || | || |  |      | || | | \n' +
    ' || | |||/+++-++-+--++---+-+++++++++--+++--+-+++-++-++++-++-+--++-\\   ||  |  |||||||  ||  | || |  |  |   || | |  ||    | | || | || |  |      | || | | \n' +
    ' || | ||||||| || |  ||   | ||||||||| /+++--+-+++-++-++++-++-+--++-+---++--+--+++++++--++--+-++-+--+--+---++-+-+--++----+-+-++-+-++-+\\ |      | || | | \n' +
    ' || | ||||||| || |  ||   | ||||||||| ||||  | ||| || |||| || |  || |   ||  |  |||^|||  ||  | || |  |  |   || | |  ||    | | || | || || |      | || | | \n' +
    ' || | ||||||| || |  |\\---+-+++++++++-++++--+-+++-++-++++-/| |  || |  /++--+--+++++++--++--+-++-+\\ |  |   || | |  ||    | | || | || || |      | || | | \n' +
    ' || | ||||||| |\\-+--+----+-++++/|||| ||||  | ||| || ||||  \\-+--++-+--+++--+--+++++++--++--+-++-++-+--+---++-+-+--++----+-+-++-+-++-/| |      | || | | \n' +
    ' || | ||||||| |  |  |   /+-++++-++++-++++--+-+++-++-++++----+--++-+--+++--+--+++++++--++--+-++-++-+--+---++-+-+--++----+-+-++-+-++\\ | |      | || | | \n' +
    ' || | ||||||| |  |  |   || |||| |||| ||||  | ||| || ||||    |  || |  |||  |  |||||||  ||  | || || |  |   ||/+-+--++----+-+-++-+-+++-+-+--\\   | || | | \n' +
    ' || | ||||||| |  \\--+---++-++++-++++-++++--+-+++-++-++++----+--++-+--+++--+--+++++++--+/  | || || |  |   |||| |  ||    | |/++-+-+++-+-+--+--\\| || | | \n' +
    ' || | ||||||| |     |   || |||| |||| ||||  | ||| || ||||    \\--++-+--+++--+--+++++++--+---+-++-++-+--+---++++-+--++----+-++++-+-+++-+-+--+--++-++-+-/ \n' +
    ' |\\-+-+++++++-+-----+---++-++++-/||| ||||  | ||| || ||||       ||/+--+++--+\\ |||||||  |   | || || |  |   |||| |  ||    | |||| | ||| | |  |  || || |   \n' +
    ' |  | ||||||| |     |   || ||\\+--+++-++++--+-/|\\-++-++++-------++++--+++--++-+++++++--+---+-++-++-+--+---++++-+--++----+-/||| | ||| | |  |  || || |   \n' +
    ' |  | ||\\++++-+-----+---++-++-+--+++-++++--+--+--++-++++-------++++--+++--++-/||||\\+--+---+-++-++-+--+---++++-+--+/    |  ||| | ||| | |  |  || || |   \n' +
    ' |  | || |||| \\-----+---++-++-+--+++-++++--+--+--++-++++-------++++--+++--++--++++-+--+---+-++-++-+--+---++++-+--/     |  ||| | ||| | |  |  || || |   \n' +
    ' |  | || ||||       |   || || |  ||| ||||/-+--+--++-++++-------++++--+++--++--++++-+--+---+-++-++-+--+---++++-+--------+\\ ||| | ||| | |  |  || || |   \n' +
    ' |  | || ||||       |   || || |  ||| ||||| |  |  || ||||/------++++--+++--++--++++-+--+--\\| || || |  |   |||| |        || ||| | ||| | |  |  || || |   \n' +
    ' |  | || ||||       |   || || |  ||| ||||| |  |  || |||||      ||||  |||  ||/-++++-+-<+--++-++-++-+--+---++++-+--------++-+++-+\\||| | |  |  || || |   \n' +
    ' |  | || ||||       |   || || |  ||| ||||| |/-+--++-+++++------++++--+++--+++-++++-+--+--++-++-++-+--+---++++-+--------++-+++-+++++-+-+\\ |  || || |   \n' +
    ' |  | || ||||       |  /++-++-+--+++-+++++-++-+-\\|| |||||      ||||  ||\\--+++-++++-+--+--+/ || || |  |   |||| |        || ||| ||||| | || |  || || |   \n' +
    ' |  | || ||||       |  ||| || |/-+++-+++++-++-+-+++-+++++------++++--++---+++-++++-+--+--+--++-++-+--+---++++-+-------\\|| ||| ||||| | || |  || || |   \n' +
    ' |  | || ||||       |  ||| || || ||| ||||| || | ||| |||||      ||||  ||   ||| |||| |  |  |  || || |  |   |||| |       ||| ||| ||||| | || |  || || |   \n' +
    ' |  | || ||||       |  ||| || || ||| ||||| || | ||| |||||      ||||  ||   ||| |||| |  |  |  || || |  |   ||\\+-+-------+++-+++-+++++-+-++-/  || || |   \n' +
    ' |  | || ||||       |  ||| || || ||| ||||| || | ||| |||||     /++++--++\\  ||| |||| |  |  |  || || |  |   || | |       ||| ||| ||||| | ||    || || |   \n' +
    ' |  | || \\+++-------+--+++-++-++-+++-+++++-++-+-+++-+++++-----++++/  |||  ||| |||| |  |  |  || || |  |   || | |       ||| ||| ||||| | ||    || || |   \n' +
    ' |  | ||  |||       |  ||| || || |\\+-+++++-++-+-+++-++/||     ||||   |||  ||| |||| |  |  |  || || |  |   || | |       ||| ||| ||||| | ||    || || |   \n' +
    ' |  | ||  |||       |  ||| || || | | |||\\+-++-+-+++-++-++-----++++---+++--+++-++++-+--+--+--++-++-+--+---++-+-/       ||| ||| ||||| | ||    || || |   \n' +
    ' |  | ||  |||       |  ||| || || | | ||\\-+-++-+-++/ || ||     ||||   |||  ||| |||| |  |  |  || || |  |   || |    /----+++-+++-+++++-+-++----++-++\\|   \n' +
    ' |  | ||  |||       |  \\++-++-++-+-+-++--+-++-+-/|  || ||     ||||   |||  ||| |||| |  |  |  || || |  |   || |    |    ||| ||| ||||| | ||    || ||||   \n' +
    ' |  | ||  |||       \\---++-++-++-/ | ||  | || \\--+--++-/|     ||||   |||  ||\\-++++-+--+--+--++-++-+--+---++-+----+----+++-+++-+/||^ | ||    || ||||   \n' +
    ' |  | ||/-+++----------\\|| || ||   | ||  | ||    |  ||  |     ||||   |||  ||  |||| |  |  |  || || |  |   || |    |    ||| ||| |/+++-+-++----++-++++\\  \n' +
    ' |  | |\\+-+++----------+++-++-++---+-++--+-++----+--++--+-----++++---+++--++--++++-+--+--+--/|/++-+--+---++-+----+--\\ ||| ||| ||||| | ||    || |||||  \n' +
    ' |  | | | |||          ||| || ||   | ||  | ||    |  ||  |     ||||   |||  ||  |||| |  |  |   |||| |  |   || |    |  | ||| ||| ||||| | ||    || |||||  \n' +
    ' |  | | | |||          ||| \\+-++---+-++--+-++----/  ||  |     ||||   |||  ||  |||| |  |  |   |||| |  |   || |    |  | ||| ||| ||||| | ||    || |||||  \n' +
    ' |  | | | |||          |||  | ||   | ||  | ||       ||  |     ||||   |||/-++--++++-+--+--+---++++-+--+\\  || |    |  | ||| ||| ||||| | ||    || |||||  \n' +
    ' |  | | | |||          |||  | ||   | ||  | ||       ||  |     ||||   |||| ||  |||| |  |  |   \\+++-+--++--++-+----+--+-+++-+++-+++++-+-++----++-+++/|  \n' +
    ' |  | | | |||          |||  | ||   | ||  | ||       ||  |     ||||   |||| ||  |||| |  |  |    ||| |  ||  || |    |  | ||| ||| ||||| | ||    || ||| |  \n' +
    ' |  | | | ||v          |||  | ||   | ||  | ||       ||  |     ||||   |||| ||  |||| |  |  |    ||| |  ||  || |    |  | ||| ||| ||||| | ||    || ||| |  \n' +
    ' |  | | | |||          |||  | \\+---+-++--+-++-------++--+-----++++---++++-++--++++-+--+--+----+++-+--++--++-+----+--+-+++-+++-/|||| | ||    || ||| |  \n' +
    '/+--+-+-+-+++---\\      |||  |  |   \\-++--+-++-------++--+-----++/|   |||| \\+--++++-+--/  |    |\\+-+--++--++-+----+--+-+++-+/|  |||| | ||    || ||| |  \n' +
    '||  | | | |||   |      |||  |  |     ||  | ||     /-++--+-----++-+---++++--+--++++-+-----+----+-+-+--++--++-+----+--+-+++\\| |  |||| | ||    || ||| |  \n' +
    '|\\--+-+-+-+++---+------+++--+--+-----++--+-++-----+-++--+-----++-+---++++--+--++++-+-----+----+-+-+--/|  || |    |  | ||||| |  \\+++-+-++----++-+++-/  \n' +
    '|   | | | |||   |      |||  |  |     ||  | ||     | ||  |     || |   ||||  |  |||| |     |    \\-+-+---+--++-+----+--/ ||||| |   ||| | ||    || |||    \n' +
    '|   | | | |||   |      |||  |  \\-----++--+-++-----+-++--+-----++-+---++++--+--++++-+-----+------+-+---+--++-+----+----/|||| |   ||| | ||    || |||    \n' +
    '|   | | | |||   |      |\\+--+--------++--+-++-----+-++--+-----++-+---++++--+--++++-+-----+---->-+-+---+--++-+----+-----++++-+---++/ | ||    || |||    \n' +
    '|   | | | ||\\---+------+-+--/        ||  | ||     | ||  |     || |   \\+++--+--++++-+-----+------/ |   |  || |    |     |||| |   ||  | ||    || |||    \n' +
    '|   | | | ||    |      | |           ||  | ||     | ||  |     || |    \\++--+--++++-+-----+--------+---+--+//+----+-----++++-+---++--+-++--\\ || |||    \n' +
    '|   | | | ||    |      | |           |\\--+-++-----+-++--+-----++-+-----++--+--++++-+-----+--------+---+--+-+/    |     |||\\-+---++--+-++--+-/| |||    \n' +
    '|   | v | ||    |      | |           \\---+-++-----+-++--+-----++-+-----++--+--++++-+-----+--------+---+--+-+-----+-----+++--+---++--/ ||  |  | |||    \n' +
    '|   | | \\-++----+------/ |               | ||     | ||  |     || |     ||  |  |||| |     |        |   |  \\-+-----+-----+++--+---++----++--+--+-+/|    \n' +
    '|   | |   ||    |        |               | ||     \\-++--+-----++<+-----++--+--++++-+-----+--------+---+----+-----+-----++/  |   ||    ||  |  | | |    \n' +
    '|   | |   ||    |        |               | ||       ||  \\-----++-+-----++--+--++++-+-----/        |   |    |     \\-----++---+---++----++--+--+-+-/    \n' +
    '|   | |   |\\----+--------+---------------+-++-------++--------++-+-----++--+--++++-+--------------+---+----+-----------/|   |   ||    ||  |  | |      \n' +
    '|   | |   |     |  /-----+------\\        | ||       ||        || |     ||  |  |||\\-+--------------/   |    |            |   \\---++----++--+--/ |      \n' +
    '|   | \\---+-----+--+-----/      |        | ||       ||        || |     ||  |  |||  |                  |    |            |       ||    ||  |    |      \n' +
    '|   |     |     |  |            |        | ||       ||        \\+-+-----/|  |  |\\+--+------------------+----+------------+-------+/    ||  |    |      \n' +
    '|   |     |     |  |            |        | ||       ||         | |      |  |  | \\--+------------------+----+------------+-------+-----/|  |    |      \n' +
    '\\---+-----+-----/  |            |        \\-++-------++---------+-+------+--+--+----+------------------+----+------------/       |      |  |    |      \n' +
    '    |     |        |            |          |\\-------++---------+-+------+--+--+----+------------------+----+--------------------+------/  |    |      \n' +
    '    |     |        |            |          |        ||         | \\------+--/  |    \\------------------+----+--------------------+---------+----/      \n' +
    '    |     \\--------+------------+----------+--------/|         |        |     |                       |    \\--------------------+---------/           \n' +
    '    \\--------------+------------+----------/         |         |        \\-----+-----------------------/                         |                     \n' +
    '                   |            |                    |         |              |                                                 |                     \n' +
    '                   |            |                    \\---------+--------------/                                                 |                     \n' +
    '                   \\------------/                              \\----------------------------------------------------------------/                     \n' +
    '                                                                                                                                                      ';

let track : Track = new Track(trackInput);
track.runRace();

for (let y = 0; y < track.coordinates.length; y++) {
    let line : string = '';
    for (let x = 0; x < track.coordinates[y].length; x++) {
        line = line.concat(track.coordinates[y][x]);
    }
    console.log(y + ': ' + line);
};
console.log(track.firstCrash);
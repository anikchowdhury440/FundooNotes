import LocalizedStrings from 'react-native-localization'
import Bengali from './Bengali'
import English from './English'
import Hindi from './Hindi'
import Italian from './Italian'
import African from './African'
import Japaneese from './Japanese'

export let Strings = new LocalizedStrings({
    "en-US" : English,
    "bn-IN" : Bengali,
    hi : Hindi,
    it : Italian,
    af : African,
    ja : Japaneese
})
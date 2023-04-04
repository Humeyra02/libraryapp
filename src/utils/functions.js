export const upperFirstLetter=(sample="")=>{
    //parametre olarak gelen cumleyi bosluk 
    // ayracina gore kelimelere ayir.
    let words=sample.split(" ")
    console.log(words);

    let newWords=[]

    // tek tek kelimeler gezilir
    for (let i=0; i<words.length; i++){
        //her bir kelimeyi karakter karakter dolasalim
        let tempWord=""
        for(let j=0;j<words[i].length; j++){
            /** herbir kelimenin ilk harfini yakalayarak buyuk harfe ceviriyoruz */
            if(j===0){
                tempWord += words[i][j].toLocaleUpperCase("tr-TR")
            }else{
                // herbir kelimenin ilk harf disindaki diger harflerine
                // yakalayarak kucuk harfe ceviriyoruz.
                tempWord += words[i][j].toLocaleLowerCase("tr-TR")
            }
    }
    newWords.push(tempWord)
    }
    //console.log(newWords);
    
    // en son bas harfi buyuk ve diger harfleri kucultulmus
    // yeni kelimeler dizisinin elemanlari arasina bosluk ekleyerek
    // yeni bir cumle olusutrup onu return ediyoruz.
    const newSample=newWords.join(" ")

    return newSample
}

export const upperFirstLetter2=(sample="")=>{
    return sample
    .split(" ")
    .map((word)=> 
        word.charAt(0).toLocaleUpperCase("tr-TR")
        +word.slice(1).toLocaleLowerCase("tr-TR"))
    .join(" ")
}
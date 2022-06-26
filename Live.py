# ███████████████████████████ MADE BY NIMITT ██████████████████████████████████████████
#                                                 MAY 2022
#                                                         COMPUTER PROJECT
#                               { GUI }


from pygame import mixer
from tkinter import *
from tkinter import filedialog
import os
import tkinter.ttk
import os


def addsongs():
      
    temp_song=filedialog.askopenfilenames(initialdir="F:\latest songs",title="Choose a song", filetypes=(("mp3 Files","*.mp3"),("All files","*.*")))
    for s in temp_song:
        
     s=s.replace("","")
    lst.insert(END,s)

def song_inport():
    temp_song = os.listdir('F:\latest songs')
    for file in temp_song:        
        
        file=file.replace("","")   
        
        lst.insert(END, file)

def Play():
    song=lst.get(ACTIVE)
    song=f'{song}'
    mixer.music.load(song)
    mixer.music.play()
''' 
    if mixer.music.pause()==True:
        mixer.music.unpause()
    else:
        return'''

def Pause():
    mixer.music.pause()

def Resume():
    mixer.music.unpause()


def Previous():
   
    previous_one=lst.curselection()
   
    previous_one=previous_one[0]-1
    
    temp2=lst.get(previous_one)
    temp2=f'{temp2}'
    mixer.music.load(temp2)
    mixer.music.play()
    lst.selection_clear(0,END)
   
    lst.activate(previous_one)
    
    lst.selection_set(previous_one)


def Next():
    
    next_one=lst.curselection()
    
    next_one=next_one[0]+1
     
    temp=lst.get(next_one)
    temp=f'{temp}'
    mixer.music.load(temp)
    mixer.music.play()
    lst.selection_clear(0,END)
    
    lst.activate(next_one)
     
    lst.selection_set(next_one)


def deletesong():
    curr_song=lst.curselection()
    lst.delete(curr_song[0])





w = Tk()

w.geometry('800x670+120+120')

w.title('Music Player')

w.config(bg='light green')

mixer.init()

lst = Listbox(w,selectmode=SINGLE,bg='Black',fg='yellow',font=('Times',14),height=100,width=400)
lst.place(x=00,y=200)



xyz = PhotoImage(file="Resources/Play-Button-Transparent-Background.png")
yyy = PhotoImage(file="Resources/117-1177251_pause-button-play-pause-button-png-transparent-png.png")
xxx = PhotoImage(file="Resources/stop button.png")
zzz = PhotoImage(file="Resources/forward button.png")
aaa = PhotoImage(file="Resources/backward button.png")
icon = PhotoImage(file="Resources//__icon__1.png")
w.iconphoto(False,icon)

btn1 = Button(w,image=xyz,command=Play)
btn1.place(x=250,y=580)

btn2 = Button(w,image=yyy,command=Resume)
btn2.place(x=330,y=580)

btn3 = Button(w,image=xxx,command=Pause)
btn3.place(x=410,y=580)

btn4 = Button(w,image=zzz,command=Next)
btn4.place(x=100,y=580)

btn5 = Button(w,image=aaa,command=Previous)
btn5.place(x=560,y=580)

btn6 = Button(w,text="Add songs ",font=('Times',14,'bold'),height=2,command=addsongs,bg='black',fg='white')
btn6.place(x=0,y=140)

btn7 = Button(w,text="Delete songs",font=('Times',14,'bold'),height=2,command=deletesong,bg='black',fg='white')
btn7.place(x=680,y=140)

btn8 = Button(w,text="Add all",font=('Times',14,'bold'),height=2,command=song_inport,bg='black',fg='white')
btn8.place(x=100,y=140)

print(type(aaa))
print(type(btn1))
print(type(lst))

my_menu=Menu(w)

w.config(menu=my_menu,height=10)

add_song_menu=Menu(my_menu,tearoff=False)

help_song_menu=Menu(my_menu,tearoff=False)

about_song_menu=Menu(my_menu,tearoff=False)

my_menu.add_cascade(label="Menu",menu=add_song_menu)

my_menu.add_cascade(label="Help",menu=help_song_menu)

my_menu.add_cascade(label="About",menu=about_song_menu)

add_song_menu.add_command(label="Add songs",command=addsongs)

add_song_menu.add_command(label="Delete songs",command=deletesong)

help_song_menu.add_command(label="Contact developer")
help_song_menu.add_command(label="Report Problem")
help_song_menu.add_command(label="Version History")

about_song_menu.add_command(label="version 1.0.0.1")
about_song_menu.add_command(label="created 10/05/2022")
about_song_menu.add_command(label="Created with help of 'SUNIL KUMAR SHARMA'")




w.mainloop()
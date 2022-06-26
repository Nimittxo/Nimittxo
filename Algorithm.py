from tkinter import *
import os
...

w = Tk()
myList = os.listdir('F:\latest songs')

lst = Listbox(w,selectmode=SINGLE,bg='Black',fg='yellow',font=('Times',14),height=100,width=400)

for file in myList:
    lst.insert(END, file)
lst.pack()
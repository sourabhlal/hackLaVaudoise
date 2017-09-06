#!/usr/bin/env python
# -*- coding: utf-8 -*-

import csv
from gtts import gTTS
import os
from tkinter import *
import vlc

def parseQuery(query):
	"""
	returns answer to question
	:param query: query entered as a string
	Returns: answer
	"""
	with open('userdata.csv') as csvfile:
		reader = csv.reader(csvfile,quotechar='"', delimiter=',',quoting=csv.QUOTE_ALL, skipinitialspace=True)
		for row in reader:
			if matches(row[0], query):
				
				tts = gTTS(text=row[1], lang='en')
				cwd = os.getcwd()
				tts.save("good.mp3")

				root = Tk()

				p = vlc.MediaPlayer("good.mp3")
				p.play()

				root.mainloop()
				return row[1]
		return "I cannot answer that, please call our customer helpline"

def matches(dbRow, query):
	if query == dbRow:
		return True
	else:
		return False

parseQuery("hello")
# from aiogram import Bot, Dispatcher

import asyncio

import telebot
from telebot import types
import os
from dotenv import load_dotenv



load_dotenv()
TG_TOKEN = os.getenv("TG_TOKEN")

class MainLogic:

    def __init__(self):

        self.bot = telebot.TeleBot(TG_TOKEN)
        self.current_section = None



        
        
        @self.bot.message_handler(commands=['start'])
        def start(message):
            self.bot.send_message(message.chat.id, "Welcome to Promix!🍝🥢 \n\nHere you can find all current promotions in your favourite restaurants and cafes. \n\nСhoose the right area for you.")

main_logic = MainLogic()
main_logic.bot.polling(none_stop=True)
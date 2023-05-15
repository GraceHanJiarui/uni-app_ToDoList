# HBuilder_ToDoList
This is a To-Do list cross-platform mobile application develop with uni-app, a framework for developing all front-end applications using HTML, CSS, Javascript and Vue.js. It's Implemented with responsive design using vue providing better performance and a smoother user experience, and used Vuex for back-end data management to centralize the application's state management.
## Table of Contents
- [About Uni-App and Vue.js](#about-uni-app-and-vuejs) <br>
- &emsp;[uni-app](#uni-app) <br>
- &emsp;[vue.js](#vuejs) <br>
- [Functionalities of this App](#functionalities-of-this-app) <br>
&emsp;[add tasks](#add-tasks) <br>
&emsp;[categorizing tasks](#categorizing-tasks) <br>
&emsp;[setting priorities](#setting-priorities) <br>
&emsp;[difficulty levels](#difficulty-levels) <br>
&emsp;[calendar](#calendar) <br>
&emsp;[daily tasks](#daily-tasks) <br>
&emsp;[token store](#token-store) <br>
- [Project Design](#project-design) <br>
&emsp;[Color Select](#color-select) <br>
&emsp;[Why pose tasks into four quadrants according to emergence and importance level?](#why-pose-tasks-into-four-quadrants-according-to-emergence-and-importance-level) <br>
&emsp;[Why categories into two groups to-do tasks and routine separately?](#why-categories-into-two-groups-to-do-tasks-and-routine-separately) <br>
&emsp;[Why automatically set emergence level?](#why-automatically-set-emergence-level) <br>
&emsp;[Difficult levels](#difficult-levels) <br>
&emsp;[Token Store](#token-store) <br>
- [Future functions](#future-functions) <br>
&emsp;[data statistics](#data-statistics) <br>
&emsp;[achievement system](#achievement-system) <br>
&emsp;[co-learning mode](#co-learning-mode) <br>

---
## About Uni-App and Vue.js
### Uni-App
[Uni-App](https://en.uniapp.dcloud.io/tutorial/app-splashscreen.html#%E5%90%AF%E5%8A%A8%E7%95%8C%E9%9D%A2%E8%AE%BE%E7%BD%AE) is a cross-end framework for developing all front-end applications using Vue.js, developers write a set of codes, which can be published to iOS, Android, Web (Responsive), as well as various small programs (WeChat/Alipay/Baidu/Toutiao/Feishu/QQ/Kuishou/DingTalk/Taobao), Quick Apps and other platforms.
The DCloud company has 9 million developers, millions of applications, 1.2 billion mobile monthly active users, thousands of uni-app plug-ins, and 70+ WeChat/QQ groups. 

### Vue.js
[Vue.js](https://vuejs.org/guide/introduction.html) is a full-featured framework with a reactive, compiler-optimized rendering system for building web user interfaces. 
It requires familarity with HTML, CSS, and JavaScript, and ensures modularity in the development process.

## Functionalities of this App
### Add Tasks
Tasks are added when users click the button on the left bottom on the main page. A card for task's detail settings will pop out. 
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/main_page.png" style="width:200px; height=350px;">
</div>
The task is a 'to-do' by default, and by clicking on the slide button in the upper left corner, this task item can be changed to a daily task item. <br>
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/to_do_card.png" style="width:200px; height=350px;">
 <img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/to_do_card_routine.png" style="width:200px; height=350px;">
</div>

### Categorizing Tasks
On the main page, tasks are able to be categorize into four quadrants according to their emergence and importance level. Tasks in different groups will be labelled in different colors.
<div align=center>
 <img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/main_page_with_tasks.png" style="width:200px; height=350px;"> 
</div>


### Setting priorities
Clicking the button to add a new to-do. <br>
Select the star to define whether the following task is important. <br>
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/to_do_card.png" style="width:200px; height=350px;">
</div>
Select the due date of theA red shadow appears under the border to remind the user that the experience and tokens earned after completing the task will also decrease task. Automatically, if the deadline is within 3 days from today, that task will be set as emergent. <br>
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/select_time.png" style="width:200px; height=350px;">
</div>
When the task is overdue, the red shadow will appear under the border to remind the user, and the experience and tokens earned after completing the task will decrease following that.
<div align=center>
 <img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/overdue_tasks.png" style="width:200px; height=350px;"> 
</div>

### Difficulty Levels
The vertical slider on the left allows you to select a value for 'how important or difficult this task is for you to complete', and the experience points and tokens obtained after completing the task will be awarded based on this value.
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/task_complete.png" style="width:200px; height=350px;">
</div>

### Calendar
A quick swipe down the screen will bring up the calendar.
The calendar will sync the tasks that have been set and show every task that are waiting for completion.
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/calendar.png" style="width:200px; height=350px;">
</div>

### Daily Tasks
Those routine tasks will separately appear here, sorted according to frequency.
For example, here's a daily tasks.
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/routine_page.png" style="width:200px; height=350px;">
</div>
As long as all of the daily tasks are completed, an extra 10 token will be awarded to user to give them a positive incentive to finish all the tasks within deadline.
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/routine_page_task_complete.png" style="width:200px; height=350px;">
</div>

### Token Store
In the token store, users can use token to buy items or props. This quantifies self-reward and gives positive feedback to the user.
I haven't drawn the image of those objects though. I'll put it up when I finish.
<div align=center>
<img src="https://github.com/GraceHanJiarui/HBuilder_ToDoList/blob/main/to-do-image/rewarding_page.png" style="width:200px; height=350px;">
</div>

## Project Design
This project aims at a convenient and easy-to-use to-do list application that motivates users to keep using.<br>
#### Color Select
- Blue makes users calm and intriguing.
- Red and blue are one of the most comfortable colors to contrast with.
-  <br>
#### Why pose tasks into four quadrants according to emergence and importance level?
- Stephen Covey’s 4 Quadrants rule <br>
#### Why categories into two groups to-do tasks and routine separately?
- For those routine and repetitive jobs, people usually do not want them to be mixed up with one-time task.
- Also noticed that it becomes very difficult and annoying for users to determine the importance level and emergence level for routine tasks, in other words, for routine tasks, 4 Quadrants rule does not really work.
- I noticed that without feedback, it's easy for users to put off daily tasks until the next day, with no motivation to complete them so I wanted to emulate the mechanics of everyday quests in games to attract users to complete everything before deadline. <br>
#### Why automatically set emergence level?
- According to psychological theory, making decisions is always energy-consuming. 
- After asking friends for advice, I found it difficult to define what tasks are urgent for many people, so categorizing tasks is automatically completed, reducing the user's decision making <br>
#### Difficult levels
- quantify work to reduce anxiety
- get more rewards for more work done. <br>
#### Token Store
- positive feedback mechanism gives motivation
- strike a proper balance between work and rest <br>
## Future Functions
### Data Statistics
### Achievement System
### Co-learning Mode

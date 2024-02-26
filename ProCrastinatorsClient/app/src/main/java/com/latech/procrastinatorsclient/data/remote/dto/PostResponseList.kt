package com.latech.procrastinatorsclient.data.remote.dto

import kotlinx.serialization.Serializable
import com.latech.procrastinatorsclient.data.remote.dto.PostResponse

@Serializable
data class PostResponseList (
    val responseList: List<PostResponse>
)
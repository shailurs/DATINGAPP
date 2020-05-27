using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public IActionResult GetValues()
        {
          string jsonBlob  =  @"[{ ""id"": 1,""name"":""shail"" },{ ""id"": 2,""name"":""charu"" }]";
          return Ok(jsonBlob);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetValue()
        {
             string jsonBlob  = @"{ ""id"": 1,""name"":""shail"" }";
          return Ok(jsonBlob);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
